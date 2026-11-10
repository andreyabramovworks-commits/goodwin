import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
await page.addInitScript(() => sessionStorage.setItem('goodwin-v6-opening-seen', 'yes'));
await page.goto('http://127.0.0.1:4178/', { waitUntil: 'load' });
await mkdir('artifacts/mobile-sections', { recursive: true });

for (const id of ['top', 'about', 'schedule', 'news', 'team', 'documents', 'callback']) {
  const section = page.locator(`#${id}`);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `artifacts/mobile-sections/${id}.png` });
}

await page.locator('footer').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: 'artifacts/mobile-sections/footer.png' });
await browser.close();
