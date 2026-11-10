import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
const results = [];
await mkdir('artifacts/mobile-audit', { recursive: true });

for (const viewport of [
  { name: 'iphone-se', width: 320, height: 568 },
  { name: 'android', width: 390, height: 844 },
  { name: 'iphone-pro-max', width: 430, height: 932 },
  { name: 'landscape', width: 844, height: 390 },
]) {
  const page = await browser.newPage({ viewport });
  await page.addInitScript(() => sessionStorage.setItem('goodwin-v6-opening-seen', 'yes'));
  await page.goto('http://127.0.0.1:4178/', { waitUntil: 'load' });
  await page.locator('main').waitFor({ state: 'visible' });
  await page.screenshot({ path: `artifacts/mobile-audit/${viewport.name}.png`, fullPage: true });
  const audit = await page.evaluate(() => {
    const interactive = [...document.querySelectorAll('a,button,input,select,textarea,summary')]
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { text: (element.textContent || element.getAttribute('aria-label') || '').trim().slice(0, 60), width: Math.round(rect.width), height: Math.round(rect.height) };
      });
    const tinyText = [...document.querySelectorAll('p,small,a,button,label,span')]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && Number.parseFloat(style.fontSize) < 12;
      }).map((element) => ({ text: element.textContent.trim().slice(0, 50), fontSize: getComputedStyle(element).fontSize }));
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth,
      shortTargets: interactive.filter((item) => item.height < 44 || item.width < 44),
      tinyText,
      consoleHeight: document.documentElement.scrollHeight,
    };
  });
  results.push({ viewport, ...audit });
  await page.close();
}

await writeFile('artifacts/mobile-audit/report.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
await browser.close();
