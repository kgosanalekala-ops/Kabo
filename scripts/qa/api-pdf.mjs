import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const base = (process.env.KABO_QA_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const output = process.env.KABO_QA_OUTPUT || 'artifacts/qa';
await mkdir(output, { recursive: true });
const report = { base, created: new Date().toISOString(), checks: [], failures: [] };
async function check(name, action) {
  try { const detail = await action(); report.checks.push({ name, pass: true, detail }); console.log('PASS', name); }
  catch (error) { report.failures.push({ name, error: error.message }); console.log('FAIL', name, error.message); }
}
for (const route of ['/api/contact', '/api/tickets', '/api/investor']) {
  await check(`${route} rejects missing fields without delivery`, async () => {
    const response = await fetch(base + route, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}', signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.ok, false); assert(body.error);
    return { status: response.status, error: body.error };
  });
}
for (const kind of ['company-profile', 'solutions-overview']) {
  await check(`${kind} PDF is downloadable and searchable`, async () => {
    const response = await fetch(`${base}/api/downloads/${kind}`, { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200); assert(response.headers.get('content-type')?.includes('application/pdf'));
    assert(response.headers.get('content-disposition')?.includes('attachment'));
    const bytes = Buffer.from(await response.arrayBuffer());
    assert(bytes.subarray(0, 5).equals(Buffer.from('%PDF-')));
    const path = `${output}/${kind}.pdf`; await writeFile(path, bytes);
    await run('pdftotext', ['-layout', path, `${output}/${kind}.txt`]);
    const text = await readFile(`${output}/${kind}.txt`, 'utf8');
    assert(text.includes('KABO'));
    assert(!/\b(?:ZAR|R)\s?\d[\d ,.]*\.\d{2}\b/.test(text), 'Price-like amount found');
    if (kind === 'company-profile') {
      assert(/A4/i.test(text), 'A4 paper missing');
      assert(/laptops?/i.test(text), 'Laptops missing');
      assert(/professional services/i.test(text), 'Service detail missing');
    }
    await run('pdftoppm', ['-f', '1', '-singlefile', '-scale-to', '1200', '-png', path, `${output}/${kind}-cover`]);
    const { stdout } = await run('pdfinfo', [path]);
    return { bytes: bytes.length, characters: text.length, pages: stdout.match(/^Pages:\s*(\d+)/m)?.[1] || 'unknown', locationMentions: [...new Set(text.match(/Pretoria|Gauteng|\+27 61 285 4418/g) || [])] };
  });
}
await check('Unknown PDF returns 404', async () => { const response = await fetch(`${base}/api/downloads/invalid-document`); assert.equal(response.status, 404); return response.status; });
await check('Unknown page returns 404', async () => { const response = await fetch(`${base}/onboarding-missing-page`); assert.equal(response.status, 404); return response.status; });
await writeFile(`${output}/api-pdf-report.json`, JSON.stringify(report, null, 2));
if (report.failures.length) process.exitCode = 1;
