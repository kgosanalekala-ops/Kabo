import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { checkFocusContained, checkViewport, assertDialogFits } from './qa-helpers.mjs';
const base = process.env.KABO_QA_URL || 'http://localhost:3001';
const out = process.env.KABO_QA_OUTPUT || 'artifacts/qa';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader']});
const context = await browser.newContext({viewport:{width:360,height:640},isMobile:true,hasTouch:true});
const page = await context.newPage();
const report = {checks:[],failures:[],pageErrors:[]};
page.on('pageerror',error=>report.pageErrors.push({url:page.url(),message:error.message}));
async function check(name, action){try{const detail=await action();report.checks.push({name,detail});console.log('PASS',name);}catch(error){report.failures.push({name,error:error.message});console.log('FAIL',name,error.message);await page.screenshot({path:`${out}/studio-form-failure-${report.failures.length}.png`}).catch(()=>{});}}
for(const slug of ['campus','compute','datacentre','security','widearea','document','resilience','workplace']){
 await check(`Studio ${slug}: all hotspots and short-phone dialogs`,async()=>{
  const response=await page.goto(`${base}/studio/${slug}`,{waitUntil:'networkidle'});assert.equal(response.status(),200);
  await page.locator('.ks-scene-image').evaluate(image=>image.decode());await checkViewport(page,slug);
  const image=await page.locator('.ks-scene-image').evaluate(el=>({width:el.naturalWidth,height:el.naturalHeight}));assert(image.width>=1600);
  const pins=page.locator('[data-hotspot]');const count=await pins.count();assert(count>=4);
  for(let i=0;i<count;i++){
   await pins.nth(i).click();const dialog=page.getByRole('dialog');await dialog.waitFor();await page.waitForTimeout(320);
   await assertDialogFits(page,dialog,`${slug} equipment${i}`);
   assert((await dialog.locator('h2').innerText()).length>4);assert(await dialog.locator('.ks-equipment-list li').count()>0);
   if(i===0){await checkFocusContained(page,dialog,8);await page.screenshot({path:`${out}/studio-${slug}-dialog.png`});}
   await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
   assert.equal(await pins.nth(i).evaluate(el=>el===document.activeElement),true);
   assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
  }
  await page.locator('.ks-change-environment').click();const chooser=page.getByRole('dialog');await chooser.waitFor();assert.equal(await chooser.locator('.ks-environment-list a').count(),8);await assertDialogFits(page,chooser,'Environment chooser');await page.keyboard.press('Escape');await chooser.waitFor({state:'detached'});
  await page.getByRole('button',{name:'Zoom into scene',exact:true}).click();assert.equal(await page.locator('.ks-zoom-controls>span').innerText(),'150%');await page.getByRole('button',{name:'Show complete scene',exact:true}).click();assert.equal(await page.locator('.ks-zoom-controls>span').innerText(),'100%');
  if(slug!=='campus')assert.equal(await page.getByRole('button',{name:/Inspect the concept in 360/}).count(),0);
  await page.evaluate(()=>scrollTo(0,0));if(slug==='campus')await page.screenshot({path:`${out}/studio-phone.png`,fullPage:true});
  return {hotspots:count,image};
 });
}
await check('Campus genuine spherical view opens and responds to controls',async()=>{
 await page.goto(`${base}/studio/campus`,{waitUntil:'networkidle'});await page.getByRole('button',{name:/Inspect the concept in 360/}).click();const dialog=page.getByRole('dialog');await dialog.waitFor();await assertDialogFits(page,dialog,'Panorama');await page.locator('.ks-panorama-canvas').waitFor({state:'visible',timeout:30000});assert.equal(await page.locator('.ks-panorama-canvas').count(),1);await page.screenshot({path:`${out}/studio-panorama-phone.png`});await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
});
await check('Desktop Studio preserves full scene and proportional hotspots',async()=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto(`${base}/studio/campus`,{waitUntil:'networkidle'});await checkViewport(page,'Studio desktop');const dims=await page.locator('.ks-scene-image').evaluate(el=>({width:el.clientWidth,height:el.clientHeight}));assert(Math.abs(dims.width/dims.height-1672/941)<.02);await page.screenshot({path:`${out}/studio-desktop.png`,fullPage:true});return dims;
});
await page.setViewportSize({width:360,height:800});
for(const [path,api] of [['/contact','contact'],['/support','tickets'],['/investors','investor']]){
 await check(`${path} shows delivery failure and accepted states without sending`,async()=>{
  let accepted=false;let payload;
  await page.route(`**/api/${api}`,async route=>{payload=route.request().postDataJSON();await route.fulfill({status:accepted?200:503,contentType:'application/json',body:JSON.stringify(accepted?{ok:true,ticket:{ticketNumber:'PREVIEW-QA'},enquiry:{routeTo:'KABO'},deliveryChannel:'test'}:{ok:false,error:'Preview QA delivery unavailable'})});});
  await page.goto(base+path,{waitUntil:'networkidle'});const form=page.locator('form').first();
  for(const input of await form.locator('input[required]').all())await input.fill(await input.getAttribute('type')==='email'?'qa@example.invalid':'Preview QA');
  for(const select of await form.locator('select[required]').all())await select.selectOption({index:1});
  for(const area of await form.locator('textarea[required]').all())await area.fill('A local browser verification. No real message is sent.');
  await form.locator('button[type=submit]').click();await page.getByRole('alert').filter({hasText:'Preview QA delivery unavailable'}).waitFor();assert(payload.email==='qa@example.invalid');
  accepted=true;await form.locator('button[type=submit]').click();await form.getByRole('status').waitFor();assert(!await form.locator('button[type=submit]').count());
  await page.unroute(`**/api/${api}`);return {api,fields:Object.keys(payload)};
 });
}
await check('Configurator carries all selected details into the editable RFQ',async()=>{
 await page.goto(base+'/configure',{waitUntil:'networkidle'});await page.getByRole('button',{name:/Intelligent compute/}).click();await page.getByLabel('Sites / facilities').selectOption('11-50');await page.getByRole('button',{name:/Continue to quotation/}).click();await page.waitForURL('**/rfq/ai-infrastructure?**');const url=new URL(page.url());assert.equal(url.searchParams.get('sites'),'11-50');await page.waitForFunction(() => document.querySelector('textarea')?.value.includes('11-50'), {timeout:10000});assert((await page.locator('textarea').inputValue()).includes('11-50'));return url.pathname+url.search;
});
await check('Contact-only address information and no private executive inbox in UI',async()=>{
 await page.goto(base+'/contact',{waitUntil:'networkidle'});const address=await page.locator('.vf-company-contact').innerText();assert(/Pretoria|Gauteng|Address|ADDRESS/.test(address));
 for(const path of ['/','/company','/about','/investors']){await page.goto(base+path,{waitUntil:'networkidle'});const text=await page.locator('body').innerText();assert(!text.includes('kenny@'));assert(!/Pretoria|Gauteng/.test(text));}
});
const reduced=await browser.newContext({viewport:{width:360,height:800},reducedMotion:'reduce'});const reducedPage=await reduced.newPage();
await check('Reduced motion renders a stable real scene and stops story autoplay',async()=>{
 await reducedPage.goto(base,{waitUntil:'networkidle'});await reducedPage.waitForFunction(()=>document.querySelector('[data-cinematic-scene]')?.dataset.renderer==='webgl');const heading=await reducedPage.locator('h1').innerText();await reducedPage.waitForTimeout(1200);const canvas=reducedPage.locator('canvas').first();const first=await canvas.screenshot();await reducedPage.waitForTimeout(600);const second=await canvas.screenshot();assert(first.equals(second),'Reduced-motion scene changed');assert.equal(await reducedPage.locator('h1').innerText(),heading);
});
await reduced.close();
const nojs=await browser.newContext({viewport:{width:360,height:800},javaScriptEnabled:false});
await check('Server-rendered original scene fallback remains visible without JavaScript',async()=>{
 const p=await nojs.newPage();await p.goto(base);assert(await p.locator('[data-cinematic-scene] svg').count());assert((await p.locator('h1').innerText()).includes('hardware'));await p.screenshot({path:`${out}/fallback-phone.png`});
});
await nojs.close();await context.close();await browser.close();
await writeFile(`${out}/studio-form-report.json`,JSON.stringify(report,null,2));if(report.failures.length||report.pageErrors.length)process.exitCode=1;
