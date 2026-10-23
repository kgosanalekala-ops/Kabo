import { chromium, request } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { checkViewport, assertDialogFits } from './qa-helpers.mjs';

const base = process.env.KABO_QA_URL?.replace(/\/$/, '');
if (!base || !base.startsWith('https://')) throw Error('KABO_QA_URL must identify the HTTPS review deployment');
const output = process.env.KABO_QA_OUTPUT || 'artifacts/qa';
await mkdir(output, { recursive: true });
const relay = process.env.KABO_QA_HTTPS_RELAY === '1';
const proxyURL = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
let proxy;
if (proxyURL) {
  const parsed = new URL(proxyURL);
  proxy = { server: parsed.origin, ...(parsed.username ? { username: decodeURIComponent(parsed.username), password: decodeURIComponent(parsed.password) } : {}) };
}
// A disposable TLS-verified request relay is useful in cloud workspaces where
// Chromium lacks the environment proxy CA. It never ignores TLS failures or
// modifies a certificate store. The client validates every live HTTPS request.
const client = await request.newContext({ ...(proxy ? { proxy } : {}), ignoreHTTPSErrors: false });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader'] });
const report = { url: base, transport: relay ? 'TLS-verified HTTPS request relay; no certificate-store changes' : 'browser network', motionPreference: 'reduce for stable software-rendered captures; normal motion verified in local capture suite', checks: [], errors: [], requests: 0 };
try {
  for (const viewport of [{ name: 'desktop', width: 1440, height: 1000 }, { name: 'phone', width: 360, height: 800 }]) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.name === 'phone', hasTouch: viewport.name === 'phone', reducedMotion: 'reduce' });
    if (relay) await context.route(base + '/**', async route => {
      try {
        const response = await client.fetch(route.request(), { timeout: 60000 });
        const body = await response.body();
        const headers = { ...response.headers() };
        delete headers['content-encoding']; delete headers['transfer-encoding']; delete headers['content-length'];
        report.requests++;
        await route.fulfill({ status: response.status(), headers, body });
      } catch (error) { report.errors.push({ path: new URL(route.request().url()).pathname, message: error.message.split('\n')[0] }); await route.abort(); }
    });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push({ viewport: viewport.name, message: error.message }));
    const response = await page.goto(base, { waitUntil: 'networkidle', timeout: 120000 });
    assert.equal(response.status(), 200);
    await page.waitForFunction(() => document.querySelector('[data-cinematic-scene]')?.dataset.renderer === 'webgl', { timeout: 60000 });
    const pause = page.getByRole('button', { name: 'Pause homepage stories', exact: true });
    if (await pause.count()) await pause.click();
    await page.getByRole('button', { name: 'Show story 1', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('h1')?.textContent.includes('hardware'));
    await page.waitForTimeout(700); await page.evaluate(() => scrollTo(0, 0));
    await checkViewport(page, 'Public ' + viewport.name);
    await page.screenshot({ path: `${output}/public-${viewport.name}.png`, timeout: 60000 });
    await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
    await page.getByRole('dialog', { name: 'KABO navigation' }).getByRole('button', { name: /Company/ }).click();
    await page.waitForURL('**/company'); await page.locator('h1').filter({ hasText: 'African perspective' }).waitFor();
    await page.goto(base + '/studio/campus', { waitUntil: 'networkidle', timeout: 90000 });
    await page.locator('[data-hotspot]').first().click();
    const dialog = page.getByRole('dialog'); await dialog.waitFor(); await page.waitForTimeout(350);
    await assertDialogFits(page, dialog, 'Public Studio dialog'); assert(await dialog.locator('.ks-equipment-list li').count());
    await page.screenshot({ path: `${output}/public-studio-${viewport.name}.png`, timeout: 60000 });
    await page.keyboard.press('Escape'); await dialog.waitFor({ state: 'detached' });
    report.checks.push({ viewport: viewport.name, homepage: 200, renderer: 'webgl', companyNavigation: true, studioHotspot: true });
    console.log('PASS public', viewport.name, 'WebGL, navigation and Studio interaction');
    await context.close();
  }
  const rejected = await client.post(base + '/api/contact', { data: {}, timeout: 60000 });
  assert.equal(rejected.status(), 400); assert.equal((await rejected.json()).ok, false);
  const pdf = await client.get(base + '/api/downloads/company-profile', { timeout: 60000 });
  assert.equal(pdf.status(), 200); assert((await pdf.body()).subarray(0, 5).equals(Buffer.from('%PDF-')));
  report.checks.push({ contactValidation: 400, companyProfile: 200 });
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
} finally {
  await browser.close(); await client.dispose();
  await writeFile(`${output}/public-browser-report.json`, JSON.stringify(report, null, 2));
}
