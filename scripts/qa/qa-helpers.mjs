import assert from 'node:assert/strict';

export async function touchSwipe(page, { x1, y1, x2, y2, steps = 8 }) {
  const session = await page.context().newCDPSession(page);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x1, y: y1 }] });
  for (let i = 1; i <= steps; i++) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x1 + (x2 - x1) * i / steps, y: y1 + (y2 - y1) * i / steps }] });
    await page.waitForTimeout(25);
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await session.detach();
}

export async function checkFocusContained(page, dialog, cycles = 24) {
  assert(await dialog.isVisible(), 'Dialog must be visible');
  const issues = [];
  for (let i = 0; i < cycles; i++) {
    await page.keyboard.press('Tab');
    const inside = await dialog.evaluate(el => el.contains(document.activeElement));
    if (!inside) issues.push({ i, active: await page.evaluate(() => ({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.slice(0, 70) })) });
  }
  assert.equal(issues.length, 0, `Focus escaped dialog: ${JSON.stringify(issues.slice(0, 3))}`);
}

export async function checkViewport(page, label) {
  const result = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    badImages: [...document.images].filter(img => img.complete && !img.naturalWidth).map(img => img.currentSrc || img.src),
    mainText: document.querySelector('main')?.textContent || '',
  }));
  assert(result.scrollWidth <= result.width + 1, `${label}: horizontal overflow ${result.scrollWidth}/${result.width}`);
  assert.equal(result.badImages.length, 0, `${label}: broken images: ${result.badImages.join(', ')}`);
  assert(!/\b(?:ZAR|R)\s?\d[\d ,.]*\.\d{2}\b/.test(result.mainText), `${label}: public price-like text`);
  return result;
}

export async function assertDialogFits(page, dialog, label) {
  const rect = await dialog.boundingBox();
  const viewport = page.viewportSize();
  assert(rect && rect.x >= -1 && rect.y >= -1 && rect.x + rect.width <= viewport.width + 1 && rect.y + rect.height <= viewport.height + 1, `${label}: dialog exceeds viewport: ${JSON.stringify(rect)} / ${JSON.stringify(viewport)}`);
}
