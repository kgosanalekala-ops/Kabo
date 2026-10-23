import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.KABO_QA_URL || "http://localhost:3000";
const out = process.env.KABO_QA_OUTPUT || "artifacts/qa/elevated";
await mkdir(out, { recursive: true });
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
const report = [];
try {
  for (const v of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "phone", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "small-phone", width: 320, height: 568 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      isMobile: v.width < 600,
      hasTouch: v.width < 1000,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForFunction(
      () =>
        document.querySelector("[data-blue-sculpture]")?.dataset.renderer ===
        "webgl",
      { timeout: 60000 },
    );
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${out}/${v.name}-home.png`,
      timeout: 60000,
    });
    const metrics = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelector("h1").textContent,
      renderer: document.querySelector("[data-blue-sculpture]").dataset
        .renderer,
    }));
    report.push({ viewport: v.name, ...metrics, errors });
    console.log(JSON.stringify(report.at(-1)));
    if (v.name === "desktop" || v.name === "phone") {
      for (const [name, selector] of [
        ["difference", ".e-difference"],
        ["solutions", ".e-solutions-home"],
        ["ai", ".e-ai-chapter"],
        ["industries", ".e-industries-home"],
        ["method", ".e-method-section"],
        ["footer", ".e-footer"],
      ]) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        await page.screenshot({
          path: `${out}/${v.name}-${name}.png`,
          timeout: 60000,
        });
      }
      for (const path of [
        "/solutions",
        "/solutions/ai-infrastructure",
        "/products",
        "/industries/mining",
        "/partners",
        "/about",
        "/services",
        "/contact",
        "/support",
        "/investors",
      ]) {
        await page.goto(base + path, {
          waitUntil: "networkidle",
          timeout: 90000,
        });
        const m = await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          title: document.querySelector("h1")?.textContent,
          images: [...document.images]
            .filter((i) => i.complete && !i.naturalWidth)
            .map((i) => i.src),
        }));
        report.push({ viewport: v.name, path, ...m });
        await page.screenshot({
          path: `${out}/${v.name}-${path.slice(1).replaceAll("/", "-")}.png`,
          timeout: 60000,
        });
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(
    `${out}/capture-report.json`,
    JSON.stringify(report, null, 2),
  );
}
