import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import ts from "typescript";
const base = process.env.KABO_QA_URL || "http://localhost:3000";
const out = process.env.KABO_QA_OUTPUT || "artifacts/qa/elevated";
await mkdir(out, { recursive: true });
const compiled = ts.transpileModule(
  await readFile("src/lib/site-routes.ts", "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const routeModule = { exports: {} };
new Function("exports", "module", compiled)(routeModule.exports, routeModule);
const { allBusinessPaths, pathToPage, hrefFor } = routeModule.exports;
const paths = ["/", ...allBusinessPaths()];
const report = { base, routes: [], apis: [] };
for (let i = 0; i < paths.length; i += 5) {
  await Promise.all(
    paths.slice(i, i + 5).map(async (path) => {
      assert.equal(
        hrefFor(pathToPage(path).page, pathToPage(path).detail),
        path,
      );
      const r = await fetch(base + path);
      assert.equal(r.status, 200, path);
      const html = await r.text();
      assert(html.includes("<h1"), path + " has primary heading");
      assert(
        !html.includes("Architecture Studio"),
        path + " no rejected Studio",
      );
      report.routes.push({ path, status: r.status });
    }),
  );
}
for (const path of [
  "/studio",
  "/studio/campus",
  "/solutions/not-a-solution",
  "/partners/not-a-partner",
  "/products/not-a-product",
]) {
  const r = await fetch(base + path);
  assert.equal(r.status, 404, path);
  report.routes.push({ path, status: r.status });
}
for (const endpoint of ["/api/contact", "/api/tickets", "/api/investor"]) {
  for (const payload of [
    {},
    null,
    { email: "bad-email" },
    { firstName: [], message: [] },
  ]) {
    const r = await fetch(base + endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    assert.equal(r.status, 400, endpoint + " invalid input");
    assert.equal((await r.json()).ok, false);
    report.apis.push({ endpoint, status: r.status, kind: "invalid" });
  }
  const malformed = await fetch(base + endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{",
  });
  assert.equal(malformed.status, 400);
  report.apis.push({
    endpoint,
    status: malformed.status,
    kind: "malformed JSON",
  });
}
// Valid fixtures are deliberately exercised only when both transports are absent.
const nextEnv = await import("@next/env");
(nextEnv.loadEnvConfig || nextEnv.default.loadEnvConfig)(process.cwd());
if (
  !process.env.SMTP_HOST &&
  !process.env.WHATSAPP_TOKEN &&
  !process.env.WHATSAPP_PHONE_NUMBER_ID
) {
  const fixtures = {
    contact: {
      firstName: "Preview",
      lastName: "Test",
      email: "preview@example.invalid",
      organisation: "Review fixture",
      enquiryType: "Other",
      message: "Local preview unavailable-delivery validation.",
    },
    tickets: {
      fullName: "Preview Test",
      email: "preview@example.invalid",
      category: "hardware",
      subject: "Local preview validation",
      description:
        "This local test checks unavailable delivery without sending any message.",
    },
    investor: {
      fullName: "Preview Test",
      email: "preview@example.invalid",
      organisation: "Review fixture",
      investorType: "Other",
      message: "Local preview unavailable-delivery validation.",
    },
  };
  for (const [stem, payload] of Object.entries(fixtures)) {
    const r = await fetch(base + "/api/" + stem, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    assert.equal(
      r.status,
      503,
      stem + " unavailable provider must fail honestly",
    );
    assert.equal((await r.json()).ok, false);
    report.apis.push({
      endpoint: "/api/" + stem,
      status: r.status,
      kind: "unconfigured delivery; no outbound provider",
    });
  }
}
await writeFile(out + "/routes-report.json", JSON.stringify(report, null, 2));
console.log(
  `PASS ${paths.length} valid routes, 5 invalid routes, ${report.apis.length} API checks`,
);
