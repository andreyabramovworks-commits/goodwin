import { test, expect } from '@playwright/test';

const cases = [
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-landscape-844', width: 844, height: 390 },
];

for (const device of cases) {
  test(`${device.name}: site and hero choices fit the viewport`, async ({ page }) => {
    await page.setViewportSize({ width: device.width, height: device.height });

    for (const [path, label] of [['/', 'site'], ['/hero-variants.html', 'choices']]) {
      await page.goto(`http://127.0.0.1:4178${path}`, { waitUntil: 'networkidle' });
      await page.locator('body').waitFor({ state: 'visible' });
      if (label === 'site') await page.waitForTimeout(3600);

      const metrics = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        visibleImages: [...document.images].filter((image) => {
          const rect = image.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }).map((image) => ({ complete: image.complete, naturalWidth: image.naturalWidth })),
      }));

      expect(metrics.scrollWidth, `${label} has horizontal overflow`).toBeLessThanOrEqual(metrics.innerWidth + 1);
      expect(metrics.visibleImages.every((image) => image.complete && image.naturalWidth > 0)).toBeTruthy();

      await page.screenshot({
        path: `artifacts/verification/${label}-${device.name}.png`,
        fullPage: label === 'choices',
      });
    }

    if (device.width <= 390) {
      await page.goto('http://127.0.0.1:4178/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3600);
      const primary = page.locator('.hero-actions .button').first();
      const box = await primary.boundingBox();
      expect(box).not.toBeNull();
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
}
