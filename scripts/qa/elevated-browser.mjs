import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { checkFocusContained, assertDialogFits } from "./qa-helpers.mjs";
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
const report = { base, checks: [], errors: [] };
const pass = (name, details = {}) => {
  report.checks.push({ name, ...details });
  console.log("PASS", name);
};
async function viewportCheck(page, width, label) {
  const m = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
    inner: innerWidth,
    images: [...document.images]
      .filter((i) => i.complete && !i.naturalWidth)
      .map((i) => i.src),
  }));
  assert(m.scroll <= width + 1, `${label}: overflow ${JSON.stringify(m)}`);
  assert.equal(m.images.length, 0, `${label}: broken image`);
  return m;
}
async function visit(page, path) {
  const r = await page.goto(base + path, {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  assert.equal(r.status(), 200, path);
  await page.locator("main h1").waitFor();
}
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(e.message));
  await visit(page, "/");
  await page.waitForFunction(
    () =>
      document.querySelector("[data-blue-sculpture]")?.dataset.renderer ===
      "webgl",
  );
  pass("Homepage actual WebGL sculpture");
  assert.equal(await page.getByText(/Architecture Studio/i).count(), 0);
  pass("No Architecture Studio");
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  await page.waitForFunction(
    () =>
      document.querySelector("[role=dialog]")?.getBoundingClientRect().right <=
      innerWidth + 1,
  );
  await assertDialogFits(page, dialog, "Desktop menu");
  await checkFocusContained(page, dialog, 24);
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  await page.waitForFunction(
    () =>
      document.activeElement?.getAttribute("aria-label") === "Open navigation",
  );
  assert(
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .evaluate((e) => e === document.activeElement),
  );
  pass("Menu focus trap, Escape and focus return");
  await page.getByRole("button", { name: "Solutions", exact: true }).click();
  await page
    .locator("#solutions-menu")
    .getByRole("link", { name: /Networking/ })
    .click();
  await page.waitForURL("**/solutions/networking");
  await page
    .getByRole("heading", { level: 1, name: "Network Fabric & SD-WAN" })
    .waitFor();
  pass("Desktop solution mega menu deep link");
  await page.goto(base + "/products");
  await page.getByLabel("Search the portfolio").fill("no-such-platform");
  await page.getByText(/No matching/i).waitFor();
  await page.getByRole("button", { name: /clear/i }).click();
  await page.locator(".e-catalog__entry").first().waitFor();
  pass("Catalogue search and reset");
  await visit(page, "/partners");
  await page.getByLabel("Search the portfolio").fill("NVIDIA");
  await page.waitForFunction(
    () => document.querySelectorAll(".e-catalog__vendors>a").length === 1,
  );
  assert.equal(await page.locator(".e-catalog__vendors>a").count(), 1);
  await page.locator(".e-catalog__vendors>a").click();
  await page.waitForURL("**/partners/nvidia");
  await page.reload({ waitUntil: "networkidle" });
  assert.match(await page.locator("h1").innerText(), /NVIDIA/);
  await page.goBack();
  await page.waitForURL("**/partners");
  await page.goForward();
  await page.waitForURL("**/partners/nvidia");
  pass("Extended vendor detail, reload, Back and Forward");
  await visit(page, "/");
  await page.getByRole("tab", { name: /Mining & Minerals/ }).click();
  assert.match(await page.locator("#industry-panel").innerText(), /mining/i);
  await page.getByRole("tab", { name: /Mining & Minerals/ }).press("ArrowDown");
  assert.match(
    await page.locator("#industry-panel").innerText(),
    /healthcare/i,
  );
  await page.getByRole("tab", { name: /08.*Prove/ }).click();
  assert.match(
    await page.locator("#method-panel").innerText(),
    /Quarterly business reviews/,
  );
  pass("Industry and delivery tabs with keyboard control");
  await page.locator(".e-procurement-list summary").first().click();
  assert(
    await page
      .locator(".e-procurement-list details")
      .first()
      .evaluate((e) => e.open),
  );
  pass("Procurement content disclosure");
  await visit(page, "/support");
  await page
    .getByRole("searchbox", { name: "Search support articles" })
    .fill("Veeam");
  assert.equal(await page.locator(".es-article").count(), 1);
  await page.locator(".es-article summary").click();
  assert(await page.locator(".es-article").evaluate((e) => e.open));
  assert.match(
    await page.locator(".es-article").innerText(),
    /last successful restore point/i,
  );
  pass("Support knowledge search and substantive article");
  for (const kind of ["contact", "support", "investor"]) {
    await visit(page, kind === "investor" ? "/investors" : "/" + kind);
    const form = page.locator("form.ef-form");
    const field = async (name, value) =>
      form.locator(`[name="${name}"]`).fill(value);
    if (kind === "contact") {
      await field("firstName", "Preview");
      await field("lastName", "Reviewer");
      await field("organisation", "Review only");
      await form
        .locator("[name=enquiryType]")
        .selectOption("AI Infrastructure & GPU Compute");
    } else {
      await field("fullName", "Preview Reviewer");
      await field("organisation", "Review only");
      if (kind === "support") {
        await form.locator("[name=category]").selectOption("hardware");
        await field("subject", "A sample platform issue");
      } else
        await form
          .locator("[name=investorType]")
          .selectOption("Private Equity");
    }
    await field("email", "reviewer@example.invalid");
    await field(
      kind === "support" ? "description" : "message",
      "This is a browser-only preview test with no outbound delivery.",
    );
    const endpoint =
      kind === "support"
        ? "/api/tickets"
        : kind === "investor"
          ? "/api/investor"
          : "/api/contact";
    let submissions = 0;
    await page.route("**" + endpoint, async (route) => {
      submissions++;
      assert.equal(route.request().method(), "POST");
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          error: "Preview delivery service is unavailable.",
        }),
      });
    });
    await form
      .getByRole("button", {
        name:
          kind === "contact"
            ? "Send enquiry"
            : kind === "support"
              ? "Send support enquiry"
              : "Request an investor conversation",
        exact: true,
      })
      .click();
    await form.getByRole("alert").waitFor();
    assert.equal(
      await form.locator("[name=email]").inputValue(),
      "reviewer@example.invalid",
    );
    const draft = await page
      .getByRole("link", { name: "Continue in your email app" })
      .getAttribute("href");
    assert(draft.startsWith("mailto:"));
    assert(decodeURIComponent(draft).includes("browser-only preview test"));
    assert.equal(await page.locator(".ef-confirmation").count(), 0);
    pass(
      kind +
        " failed-delivery feedback, retained input and complete email draft",
    );
    await page.unroute("**" + endpoint);
    const result = {
      acknowledgement: "Browser-only simulated provider acceptance.",
      nextSteps: ["The team can review the submitted enquiry."],
      contact: { email: "info@kaboitgroup.co.za" },
      ...(kind === "support"
        ? {
            ticketNumber: "KABO-TEST-001",
            priority: "P2",
            slaResponse: "As contracted",
            slaWindow: "As contracted",
            escalationPath: [],
          }
        : {}),
    };
    await page.route("**" + endpoint, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          [kind === "support" ? "ticket" : "enquiry"]: result,
        }),
      }),
    );
    await form
      .getByRole("button", {
        name:
          kind === "contact"
            ? "Send enquiry"
            : kind === "support"
              ? "Send support enquiry"
              : "Request an investor conversation",
        exact: true,
      })
      .click();
    await page.locator(".ef-confirmation").waitFor();
    assert.match(
      await page.locator(".ef-confirmation").innerText(),
      /Browser-only simulated/,
    );
    await page.getByRole("button", { name: "Send another enquiry" }).click();
    assert.equal(await page.locator("form [name=email]").inputValue(), "");
    await page.unroute("**" + endpoint);
    pass(
      kind +
        " successful acknowledgement and reset (intercepted; no email sent)",
    );
  }
  await context.close();
  for (const v of [
    { width: 320, height: 568 },
    { width: 360, height: 640 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 1000 },
  ]) {
    const c = await browser.newContext({
      viewport: v,
      reducedMotion: "reduce",
      isMobile: v.width < 600,
      hasTouch: v.width < 1000,
    });
    const p = await c.newPage();
    p.on("pageerror", (e) => report.errors.push(e.message));
    for (const path of [
      "/",
      "/solutions",
      "/solutions/ai-infrastructure",
      "/products/compute-platforms",
      "/industries/public-sector",
      "/partners/palo-alto",
      "/about",
      "/services",
      "/case-studies",
      "/contact",
      "/support",
      "/investors",
      "/privacy",
      "/terms",
    ]) {
      await visit(p, path);
      await viewportCheck(p, v.width, `${v.width} ${path}`);
    }
    await p
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    const d = p.getByRole("dialog");
    await d.waitFor();
    await p.waitForFunction(
      () =>
        document.querySelector("[role=dialog]")?.getBoundingClientRect()
          .right <=
        innerWidth + 1,
    );
    await assertDialogFits(p, d, `${v.width} menu`);
    await p.keyboard.press("Escape");
    pass("Responsive pages and menu " + v.width + "×" + v.height, {
      pages: 14,
    });
    await c.close();
  }
  const motionContext = await browser.newContext({
    viewport: { width: 1100, height: 900 },
  });
  const mp = await motionContext.newPage();
  mp.on("pageerror", (e) => report.errors.push(e.message));
  await visit(mp, "/");
  await mp.waitForFunction(
    () =>
      document.querySelector("[data-blue-sculpture]")?.dataset.renderer ===
      "webgl",
  );
  const canvas = mp.locator("[data-blue-sculpture] canvas");
  const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
  const a = hash(await canvas.screenshot());
  await mp.waitForTimeout(350);
  const b = hash(await canvas.screenshot());
  assert.notEqual(a, b, "Live sculpture must change across frames");
  await mp
    .getByRole("button", { name: "Pause animation", exact: true })
    .click();
  await mp.waitForTimeout(500);
  const frozenA = hash(await canvas.screenshot());
  await mp.waitForTimeout(350);
  const frozenB = hash(await canvas.screenshot());
  assert.equal(frozenA, frozenB, "Pause must stop the sculpture");
  pass("Normal-motion 3D frames change and pause truly freezes animation");
  await motionContext.close();
  const fallback = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await fallback.addInitScript(() => {
    const get = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      if (String(kind).includes("webgl")) return null;
      return get.call(this, kind, ...args);
    };
  });
  const fp = await fallback.newPage();
  await visit(fp, "/");
  await fp.waitForTimeout(400);
  assert.equal(
    await fp.locator("[data-blue-sculpture]").getAttribute("data-renderer"),
    "fallback",
  );
  assert(
    await fp
      .getByRole("link", { name: "Explore our solutions", exact: true })
      .isVisible(),
  );
  await fp.screenshot({ path: out + "/webgl-fallback-phone.png" });
  pass(
    "No-WebGL fallback keeps branding, artwork and primary navigation usable",
  );
  await fallback.close();
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
} finally {
  await browser.close();
  await writeFile(
    out + "/browser-report.json",
    JSON.stringify(report, null, 2),
  );
}
