import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { checkViewport } from './qa-helpers.mjs';
const base = process.env.KABO_QA_URL || 'http://localhost:3003';
const out = process.env.KABO_QA_OUTPUT || 'artifacts/qa';
await mkdir(out,{recursive:true});
const sitemap = await (await fetch(base+'/sitemap.xml')).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
assert(paths.length>=60);assert(paths.includes('/solutions/compute')&&paths.includes('/company'));
const report={routes:[],browser:[],errors:[]};
for(const path of paths){const response=await fetch(base+path);const html=await response.text();assert.equal(response.status,200,path);assert(html.includes('<h1'),`${path} missing heading`);report.routes.push({path,status:response.status});}
console.log('PASS all',paths.length,'public sitemap routes render a heading');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:360,height:800},isMobile:true,hasTouch:true});page.on('pageerror',error=>report.errors.push(error.message));
for(const [path,title] of [['/solutions/compute','Compute'],['/solutions/data','Storage'],['/solutions/security','Cybersecurity'],['/solutions/physical-security','Surveillance'],['/solutions/analytics-bi','Analytics'],['/solutions/iot-edge','IoT'],['/solutions/campus-network','campus']]){
 await page.goto(base+path,{waitUntil:'networkidle'});const heading=await page.locator('h1').innerText();assert(heading.toLowerCase().includes(title.toLowerCase()),`${path}: ${heading}`);await checkViewport(page,path);report.browser.push({path,heading});if(path==='/solutions/compute')await page.screenshot({path:out+'/solution-phone.png',fullPage:true});
}
assert.equal(report.errors.length,0);await browser.close();await writeFile(out+'/route-report.json',JSON.stringify(report,null,2));console.log('PASS original technology deep links, content and phone layouts');
