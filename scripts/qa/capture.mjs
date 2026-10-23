import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = (process.env.KABO_QA_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const output = process.env.KABO_QA_OUTPUT || 'artifacts/qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'] });
const sizes = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'phone', width: 360, height: 800 },
  { name: 'phone-short', width: 360, height: 640 },
];
const report = { base, created: new Date().toISOString(), captures: [], errors: [], badResponses: [], failedRequests: [] };
for (const size of sizes) {
  const context = await browser.newContext({ viewport: { width: size.width, height: size.height }, deviceScaleFactor: 1, isMobile: size.width < 1000, hasTouch: size.width < 1000 });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push({ viewport: size.name, message: error.message }));
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('/_next/hmr')) report.errors.push({ viewport: size.name, message: message.text().slice(0, 700), source: 'console' }); });
  page.on('response', response => { if (response.status() >= 400) report.badResponses.push({ viewport: size.name, status: response.status(), url: response.url() }); });
  page.on('requestfailed', request => report.failedRequests.push({ viewport: size.name, url: request.url(), error: request.failure()?.errorText }));
  const response = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.trim(), { timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('[data-cinematic-scene]').waitFor({ state: 'attached', timeout: 30000 });
  await page.waitForFunction(() => document.querySelector('[data-cinematic-scene]')?.getAttribute('data-renderer') === 'webgl', { timeout: 30000 }).catch(() => {});
  const pause = page.getByRole('button', { name: 'Pause homepage stories', exact: true });
  if (await pause.count()) await pause.click();
  await page.getByRole('button', { name: 'Show story 1', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('hardware'), { timeout: 10000 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const data = await page.evaluate(() => ({
    title: document.title,
    renderer: document.querySelector('[data-cinematic-scene]')?.getAttribute('data-renderer'),
    heading: document.querySelector('h1')?.innerText,
    bodyWidth: document.documentElement.scrollWidth,
    viewport: innerWidth,
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    overflowingElements: [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && (r.right > innerWidth + 2 || r.left < -2); }).slice(0, 16).map(el => ({ tag: el.tagName, className: String(el.className).slice(0, 140), left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right) })),
    brokenImages: [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src),
    canvases: [...document.querySelectorAll('canvas')].map(el => ({ width: el.width, height: el.height, clientWidth: el.clientWidth, clientHeight: el.clientHeight })),
    header: document.querySelector('header')?.getBoundingClientRect().toJSON(),
    hero: document.querySelector('.kc-hero,.vf-home-hero')?.getBoundingClientRect().toJSON(),
  }));
  await page.screenshot({ path: `${output}/${size.name}-hero.png`, fullPage: false, animations: 'allow' });
  await page.screenshot({ path: `${output}/${size.name}-full.png`, fullPage: true, animations: 'allow' });
  let animation = null;
  const canvas = page.locator('canvas').first();
  if (await canvas.count() && await canvas.isVisible()) {
    const box = await canvas.boundingBox();
    const clip = { x: Math.max(0, box.x), y: Math.max(0, box.y), width: Math.min(size.width, box.x + box.width) - Math.max(0, box.x), height: Math.min(size.height, box.y + box.height) - Math.max(0, box.y) };
    const first = await page.screenshot({ path: `${output}/${size.name}-scene-frame-a.png`, clip });
    await page.waitForTimeout(1100);
    const second = await page.screenshot({ path: `${output}/${size.name}-scene-frame-b.png`, clip });
    animation = { first: createHash('sha256').update(first).digest('hex'), second: createHash('sha256').update(second).digest('hex') };
    animation.changed = animation.first !== animation.second;
  }
  report.captures.push({ ...size, status: response.status(), ...data, animation });
  console.log(JSON.stringify({ viewport: size.name, status: response.status(), heading: data.heading, overflow: data.overflow, canvas: data.canvases, animationChanged: animation?.changed }));
  await context.close();
}
await browser.close();
await writeFile(`${output}/capture-report.json`, JSON.stringify(report, null, 2));
console.log(`Saved evidence to ${output}`);
if (report.captures.some(item => item.status !== 200 || item.overflow || item.brokenImages.length || item.renderer !== 'webgl') || report.errors.length) process.exitCode = 1;
