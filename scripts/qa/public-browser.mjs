import { chromium, request } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.KABO_QA_URL?.replace(/\/$/, "");
if (!base?.startsWith("https://"))
  throw Error("Set KABO_QA_URL to the actual public HTTPS preview");
const out =
  process.env.KABO_QA_OUTPUT || "artifacts/qa/elevated-public";
await mkdir(out, { recursive: true });
const proxyURL = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
let proxy;
if (proxyURL) {
  const parsed = new URL(proxyURL);
  proxy = {
    server: parsed.origin,
    ...(parsed.username
      ? {
          username: decodeURIComponent(parsed.username),
          password: decodeURIComponent(parsed.password),
        }
      : {}),
  };
}
// In this workspace Chromium lacks the environment proxy CA. This isolated
// request relay validates every live HTTPS request with the normal system CA.
// It changes no certificate store and never ignores a certificate error.
const client = await request.newContext({
  ...(proxy ? { proxy } : {}),
  ignoreHTTPSErrors: false,
});
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--enable-unsafe-swiftshader",
    "--use-gl=angle",
    "--use-angle=swiftshader",
  ],
});
const report = {
  url: base,
  transport:
    process.env.KABO_QA_HTTPS_RELAY === "1"
      ? "TLS-verified request relay"
      : "browser network",
  checks: [],
  errors: [],
  requests: 0,
};
try {
  const home = await client.get(base, { timeout: 60000 });
  assert.equal(home.status(), 200);
  assert((await home.text()).includes("Built to perform."));
  report.checks.push("Public HTTPS homepage serves the new design");
  for (const v of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "phone", width: 390, height: 844 },
  ]) {
    const c = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      isMobile: v.name === "phone",
      hasTouch: v.name === "phone",
      reducedMotion: "reduce",
    });
    if (process.env.KABO_QA_HTTPS_RELAY === "1")
      await c.route(base + "/**", async (route) => {
        try {
          const response = await client.fetch(route.request(), {
            timeout: 60000,
          });
          const body = await response.body();
          const headers = { ...response.headers() };
          delete headers["content-encoding"];
          delete headers["transfer-encoding"];
          delete headers["content-length"];
          report.requests++;
          await route.fulfill({ status: response.status(), headers, body });
        } catch (error) {
          report.errors.push(error.message.split("\n")[0]);
          await route.abort();
        }
      });
    const page = await c.newPage();
    page.on("pageerror", (error) => report.errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error")
        report.errors.push(message.text().slice(0, 250));
    });
    await page.goto(base, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForFunction(
      () =>
        document.querySelector("[data-blue-sculpture]")?.dataset.renderer ===
        "webgl",
      { timeout: 60000 },
    );
    assert.equal(
      await page.locator("main h1").innerText(),
      "Intelligent\ninfrastructure.\nBuilt to perform.",
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth),
      v.width,
    );
    await page.screenshot({
      path: `${out}/public-${v.name}-home.png`,
      timeout: 60000,
    });
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    await dialog.getByRole("link", { name: "About KABO" }).click();
    await page.waitForURL("**/about");
    await page
      .getByRole("heading", { level: 1 })
      .filter({ hasText: "engineered for the AI era" })
      .waitFor();
    await page.waitForFunction(
      () => getComputedStyle(document.querySelector("main")).opacity === "1",
    );
    await page.screenshot({
      path: `${out}/public-${v.name}-about.png`,
      timeout: 60000,
    });
    await page.goto(base + "/solutions/ai-infrastructure", {
      waitUntil: "networkidle",
      timeout: 90000,
    });
    await page
      .getByRole("heading", {
        level: 1,
        name: "AI Infrastructure & GPU Compute",
      })
      .waitFor();
    assert((await page.locator(".e-use-cases>div").count()) === 8);
    await page.screenshot({
      path: `${out}/public-${v.name}-ai.png`,
      timeout: 60000,
    });
    await page.goto(base + "/contact", {
      waitUntil: "networkidle",
      timeout: 90000,
    });
    assert(await page.locator("form.ef-form").isVisible());
    assert.equal(
      await page.locator("input[name=email]").getAttribute("type"),
      "email",
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth),
      v.width,
    );
    await page.screenshot({
      path: `${out}/public-${v.name}-contact.png`,
      timeout: 60000,
    });
    report.checks.push(
      `${v.name}: actual WebGL, navigation, detailed AI page, contact form, no overflow`,
    );
    await c.close();
  }
  const invalid = await client.post(base + "/api/contact", {
    data: {},
    timeout: 60000,
  });
  assert.equal(invalid.status(), 400);
  assert.equal((await invalid.json()).ok, false);
  const removed = await client.get(base + "/studio", { timeout: 60000 });
  assert.equal(removed.status(), 404);
  report.checks.push("Public API validation400; removed Studio404");
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
} finally {
  await browser.close();
  await client.dispose();
  await writeFile(out + "/public-report.json", JSON.stringify(report, null, 2));
}
console.log(
  `PASS ${report.checks.length} public checks; ${report.requests} live HTTPS requests validated`,
);
