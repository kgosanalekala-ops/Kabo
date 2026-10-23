import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { touchSwipe, checkFocusContained, checkViewport, assertDialogFits } from './qa-helpers.mjs';

const base = (process.env.KABO_QA_URL || 'http://localhost:3001').replace(/\/$/, '');
const output = process.env.KABO_QA_OUTPUT || 'artifacts/qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'] });
const context = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
const page = await context.newPage();
const report = { base, created: new Date().toISOString(), checks: [], failures: [], pageErrors: [] };
page.on('pageerror', error => report.pageErrors.push({ route: page.url(), message: error.message }));
async function check(name, action) {
  try { const detail = await action(); report.checks.push({ name, pass: true, detail }); console.log('PASS', name); }
  catch (error) { report.failures.push({ name, error: error.message }); console.log('FAIL', name, error.message); await page.screenshot({ path: `${output}/failure-${report.failures.length}.png` }).catch(() => {}); }
}
async function goto(path) { const response = await page.goto(base + path, { waitUntil: 'domcontentloaded', timeout: 60000 }); await page.locator('h1').first().waitFor(); await page.waitForTimeout(350); return response; }
async function pressStory(number) { await page.getByRole('button', { name: `Show story ${number}`, exact: true }).click(); await page.waitForTimeout(1100); assert.equal(await page.getByRole('button', { name: `Show story ${number}`, exact: true }).getAttribute('aria-pressed'), 'true'); }

await check('Three homepage stories and pause control', async () => {
  await goto('/');
  await page.getByRole('button', { name: 'Pause homepage stories', exact: true }).click();
  const headings = [];
  for (const number of [1, 2, 3]) { await pressStory(number); headings.push(await page.locator('h1').innerText()); }
  assert.equal(new Set(headings).size, 3); assert(headings[0].includes('hardware')); assert(headings[1].includes('Connection')); assert(headings[2].includes('Every space'));
  return headings;
});
await check('Real horizontal touch swipe changes story in both directions', async () => {
  await pressStory(1); await page.evaluate(() => scrollTo(0, 0));
  await touchSwipe(page, { x1: 290, y1: 200, x2: 70, y2: 204 }); await page.waitForTimeout(900);
  assert.equal(await page.getByRole('button', { name: 'Show story 2', exact: true }).getAttribute('aria-pressed'), 'true');
  await touchSwipe(page, { x1: 70, y1: 200, x2: 290, y2: 204 }); await page.waitForTimeout(900);
  assert.equal(await page.getByRole('button', { name: 'Show story 1', exact: true }).getAttribute('aria-pressed'), 'true');
});
await check('Vertical touch scroll remains native and preserves story', async () => {
  await touchSwipe(page, { x1: 170, y1: 590, x2: 173, y2: 230 }); await page.waitForTimeout(600);
  const y = await page.evaluate(() => scrollY); assert(y > 100, `Expected vertical scroll, got ${y}`);
  assert.equal(await page.getByRole('button', { name: 'Show story 1', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.evaluate(() => scrollTo(0, 0)); return { scrollY: y };
});
await check('Mobile menu fits, is one column and traps focus', async () => {
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'KABO navigation' }); await dialog.waitFor();
  await assertDialogFits(page, dialog, 'Mobile navigation');
  const rows = await page.locator('.vf-nav-large').evaluateAll(elements => elements.map(element => ({ x: element.getBoundingClientRect().x, y: element.getBoundingClientRect().y })));
  assert(rows.length >= 8); assert(rows.every(row => Math.abs(row.x - rows[0].x) < 2));
  await checkFocusContained(page, dialog, 18); await page.keyboard.press('Escape'); await dialog.waitFor({ state: 'detached' });
  assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
});
await check('Company navigation has distinct route and closes same-route menu', async () => {
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'KABO navigation' });
  await dialog.getByRole('button', { name: /Company/ }).click(); await page.waitForURL('**/company'); await page.waitForTimeout(650);
  const company = await page.locator('h1').innerText();
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  await page.getByRole('dialog', { name: 'KABO navigation' }).getByRole('button', { name: /Company/ }).click();
  await page.waitForTimeout(650); assert.equal(await page.getByRole('dialog', { name: 'KABO navigation' }).count(), 0); assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
  await goto('/about'); assert.notEqual(await page.locator('h1').innerText(), company); return { company, approach: await page.locator('h1').innerText() };
});
await check('Search resolves Company, support, investor and publication results', async () => {
  for (const [query, route] of [['company', '/company'], ['support', '/support'], ['investor', '/investors']]) {
    await page.getByRole('button', { name: 'Search website', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Search KABO website' }); await dialog.locator('input').fill(query); await checkFocusContained(page, dialog, 12);
    await dialog.locator('button').filter({ hasText: query === 'investor' ? 'Investor' : new RegExp(query, 'i') }).first().click();
    await page.waitForURL(`**${route}`); await page.waitForTimeout(600);
  }
  await page.getByRole('button', { name: 'Search website', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Search KABO website' }); await dialog.locator('input').fill('company profile'); assert(await dialog.locator('a[href="/api/downloads/company-profile"]').count());
  await page.keyboard.press('Escape'); await dialog.waitFor({ state: 'detached' });
});
await check('All legal dialogs fit short phone, trap focus and close with Escape', async () => {
  await page.setViewportSize({ width: 360, height: 640 });
  for (const title of ['Privacy notice', 'Copyright & content rights', 'Terms of use']) {
    await page.getByRole('button', { name: title, exact: true }).click();
    const dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: title, exact: true }) });
    await dialog.waitFor(); await assertDialogFits(page, dialog, title); await checkFocusContained(page, dialog, 6);
    await page.keyboard.press('Escape'); await dialog.waitFor({ state: 'detached' }); assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
  }
  await page.setViewportSize({ width: 360, height: 800 });
});

for (const path of ['/company', '/about', '/solutions', '/products', '/products/compute-platforms', '/industries', '/industries/healthcare', '/services', '/procurement', '/partners', '/support', '/investors', '/contact', '/rfq', '/configure']) {
  await check(`Phone page ${path}: renders without overflow/bad images/prices`, async () => {
    const response = await goto(path); assert.equal(response.status(), 200); return { heading: await page.locator('h1').innerText(), ...(await checkViewport(page, path)) };
  });
}

await browser.close();
await writeFile(`${output}/interaction-report.json`, JSON.stringify(report, null, 2));
if (report.failures.length || report.pageErrors.length) process.exitCode = 1;
