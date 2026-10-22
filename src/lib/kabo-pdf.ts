import { KABO_CATALOGUE, KABO_APPROACH } from "./kabo-catalogue";

/** Original compact PDF writer for printable KABO client documents. All pages use white stock. */
const PAGE_W=595,PAGE_H=842,LEFT=49,RIGHT=547;
type Page={ops:string[];y:number};
const ascii=(s:string)=>s.normalize("NFKD").replace(/[\u2010-\u2015]/g,"-").replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[^\x20-\x7E]/g," ");
const esc=(s:string)=>ascii(s).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)");
const ink="0.13 0.18 0.21",blue="0 0.38 0.59",mute="0.36 0.43 0.47",pale="0.92 0.96 0.98";
const t=(p:Page,x:number,y:number,text:string,size=11,font="F1",color=ink)=>{p.ops.push(`BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)} Tm (${esc(text)}) Tj ET`)};
const rect=(p:Page,x:number,y:number,w:number,h:number,c:string)=>p.ops.push(`${c} rg ${x} ${y} ${w} ${h} re f`);
const line=(p:Page,x:number,y:number,x2:number,y2:number,color=blue,width=1)=>p.ops.push(`${color} RG ${width} w ${x} ${y} m ${x2} ${y2} l S`);
function wrap(s:string,maxChars:number){const words=ascii(s).split(/\s+/);const ls:string[]=[];let cur="";for(const w of words){if((cur+" "+w).trim().length>maxChars&&cur){ls.push(cur);cur=w}else cur=cur?cur+" "+w:w;}if(cur)ls.push(cur);return ls}
function logo(p:Page,y:number){t(p,LEFT,y,"KABO",23,"F2",ink);p.ops.push(`${blue} rg ${LEFT+83} ${y+6} 6 0 360 arc f`); // rewritten as Bezier below
}
function drawLogo(p:Page,y:number){t(p,LEFT,y,"KABO",24,"F2",ink);const x=132,cy=y+6,r=5,k=.5522848;p.ops.push(`${blue} rg ${(x+r).toFixed(1)} ${cy} m ${(x+r).toFixed(1)} ${(cy+k*r).toFixed(1)} ${(x+k*r).toFixed(1)} ${(cy+r).toFixed(1)} ${x} ${(cy+r).toFixed(1)} c ${(x-k*r).toFixed(1)} ${(cy+r).toFixed(1)} ${(x-r).toFixed(1)} ${(cy+k*r).toFixed(1)} ${(x-r).toFixed(1)} ${cy} c ${(x-r).toFixed(1)} ${(cy-k*r).toFixed(1)} ${(x-k*r).toFixed(1)} ${(cy-r).toFixed(1)} ${x} ${(cy-r).toFixed(1)} c ${(x+k*r).toFixed(1)} ${(cy-r).toFixed(1)} ${(x+r).toFixed(1)} ${(cy-k*r).toFixed(1)} ${(x+r).toFixed(1)} ${cy} c f`);}
function drawBlueprint(p:Page,x:number,y:number){ // original line illustration, not a manufacturer topology
 const towers=[{x:x,y:y,h:88},{x:x+95,y:y+30,h:126},{x:x+190,y:y+3,h:101},{x:x+280,y:y+46,h:91}];
 towers.forEach((o,i)=>{rect(p,o.x,o.y,64,o.h,pale);line(p,o.x,o.y,o.x+64,o.y,blue,1.2);line(p,o.x,o.y,o.x,o.y+o.h,blue,1);line(p,o.x+64,o.y,o.x+64,o.y+o.h,blue,1);line(p,o.x,o.y+o.h,o.x+64,o.y+o.h,blue,1);for(let j=0;j<4;j++)line(p,o.x+10,o.y+16+j*17,o.x+53,o.y+16+j*17,"0.68 0.81 0.89",1);if(i)t(p,o.x+15,o.y-17,"0"+(i+1),9,"F2",blue)});
 line(p,x+64,y+16,x+95,y+46,blue,1.5);line(p,x+159,y+46,x+190,y+18,blue,1.5);line(p,x+254,y+18,x+280,y+60,blue,1.5);
}
function newPage(pages:Page[],label:string):Page{const p={ops:[],y:725};pages.push(p);drawLogo(p,779);t(p,RIGHT-150,784,"POWERING INTELLIGENT INFRASTRUCTURE",7,"F2",mute);line(p,LEFT,762,RIGHT,762,"0.76 0.84 0.87",.7);t(p,LEFT,739,label.toUpperCase(),8,"F2",blue);return p}
function para(p:Page,s:string,size=10.4,indent=0,space=5){const ls=wrap(s,Math.floor((498-indent)/(size*.53)));for(const v of ls){t(p,LEFT+indent,p.y,v,size,"F1",ink);p.y-=size*1.47;}p.y-=space}
function ensure(pages:Page[],p:Page,minY:number,label:string){return p.y<minY?newPage(pages,label):p}
function heading(p:Page,s:string){p.y-=12;const ls=wrap(s,42);ls.forEach(v=>{t(p,LEFT,p.y,v,19,"F2",ink);p.y-=26});line(p,LEFT,p.y+7,LEFT+94,p.y+7,blue,2);p.y-=19}
function item(p:Page,name:string,detail:string){t(p,LEFT+8,p.y,name,10.3,"F2",ink);p.y-=14;const lines=wrap(detail,87);lines.forEach(s=>{t(p,LEFT+8,p.y,s,9.4,"F1",mute);p.y-=13});line(p,LEFT+8,p.y+6,RIGHT-8,p.y+6,"0.87 0.91 0.93",.5);p.y-=8}
function makePdf(pages:Page[]):Uint8Array{
 const obj:string[]=[""];const push=(v:string)=>{obj.push(v);return obj.length-1};
 const font1=push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),font2=push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
 const pagesObj=push("");const refs:number[]=[];
 pages.forEach((p,i)=>{line(p,LEFT,55,RIGHT,55,"0.76 0.84 0.87",.7);t(p,LEFT,39,"KABO IT GROUP (PTY) LTD  /  PRETORIA, SOUTH AFRICA",7.2,"F1",mute);t(p,RIGHT-55,39,String(i+1).padStart(2,"0")+" / "+String(pages.length).padStart(2,"0"),7.2,"F2",blue);
 const stream=p.ops.join("\n");const content=push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
 const page=push(`<< /Type /Page /Parent ${pagesObj} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >> >> /Contents ${content} 0 R >>`);refs.push(page);
 });
 obj[pagesObj]=`<< /Type /Pages /Kids [${refs.map(n=>n+" 0 R").join(" ")}] /Count ${refs.length} >>`;
 const catalog=push(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);
 let result="%PDF-1.4\n%KABO\n";const offsets=[0];
 for(let i=1;i<obj.length;i++){offsets.push(result.length);result+=i+" 0 obj\n"+obj[i]+"\nendobj\n"}
 const xref=result.length;result+="xref\n0 "+obj.length+"\n0000000000 65535 f \n";for(let i=1;i<obj.length;i++)result+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";
 result+=`trailer\n<< /Size ${obj.length} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
 return new Uint8Array(Array.from(result,c=>c.charCodeAt(0)));
}
export function generateKaboPdf(kind:"company-profile"|"solutions-overview"):Uint8Array{
 const pages:Page[]=[];
 let p=newPage(pages,kind==="company-profile"?"Corporate profile / detailed capabilities":"Client solutions / overview");
 p.y=651;
 t(p,LEFT,p.y,"KABO IT GROUP",40,"F2",ink);p.y-=51;
 t(p,LEFT,p.y,kind==="company-profile"?"COMPANY PROFILE":"SOLUTIONS OVERVIEW",26,"F2",blue);p.y-=38;
 para(p,kind==="company-profile"?"A practical, itemised reference to the technology equipment, supplies and professional services KABO can discuss, source and support for client-specific requirements.":"An accessible introduction to KABO's solution domains and engagement approach. Detailed configuration decisions and implementation methods remain specific to each client engagement.",12);
 p.y-=30;drawBlueprint(p,LEFT+10,276);p.y=236;
 t(p,LEFT,p.y,"KABO IT GROUP (PTY) LTD",12,"F2",ink);p.y-=20;
 t(p,LEFT,p.y,"Pretoria, Gauteng  |  South Africa",10,"F1",mute);p.y-=17;
 t(p,LEFT,p.y,"www.kaboitgroup.co.za   |   info@kaboitgroup.co.za",9.5,"F1",mute);
 if(kind==="company-profile"){
 p=newPage(pages,"What we do");p.y=685;heading(p,"KABO at a glance");
 para(p,"KABO IT Group (Pty) Ltd is a Pretoria-based South African technology company focused on ICT infrastructure, compute, networking, electronic security, document systems and workplace procurement. Scope, specifications and availability are confirmed through enquiry and requirements review.",11);
 heading(p,"How this profile is organised");
 para(p,"Each service domain below distinguishes equipment and materials that may be sourced from professional activities that may form part of an agreed project. Examples explain what each item is used for; they do not assert stockholding, OEM authorisations or guaranteed delivery.");
 p.y-=12;drawBlueprint(p,LEFT+10,270);
 for(let i=0;i<KABO_CATALOGUE.length;i++){
  const section=KABO_CATALOGUE[i];p=newPage(pages,"Catalogue / "+String(i+1).padStart(2,"0"));p.y=700;
  heading(p,section.title);para(p,section.intro,11,0,10);
  t(p,LEFT,p.y,"EQUIPMENT / PRODUCTS / CONSUMABLES",8.5,"F2",blue);p.y-=25;
  for(const [name,desc] of section.products){p=ensure(pages,p,108,section.title+" / continued");item(p,name,desc)}
  p=ensure(pages,p,180,section.title+" / services");p.y-=4;t(p,LEFT,p.y,"PROFESSIONAL SERVICES / DELIVERY ACTIVITIES",8.5,"F2",blue);p.y-=21;
  for(const s of section.services){p=ensure(pages,p,90,section.title+" / continued");para(p,"- "+s,9.7,6,3)}
 }
 p=newPage(pages,"Contact / next steps");p.y=670;heading(p,"Talk to KABO about your requirements");
 para(p,"Tell us the environment, quantities, locations, compatibility constraints and desired outcome. KABO will clarify the scope and proposed sourcing or services before any commitment is made.",11);
 p.y-=14;para(p,"Website: www.kaboitgroup.co.za",11);para(p,"Email: info@kaboitgroup.co.za",11);para(p,"Phone: +27 61 285 4418",11);
 p.y-=35;t(p,LEFT,p.y,"PUBLIC-FACING INFORMATION / 22 OCTOBER 2026",8,"F2",blue);p.y-=25;
 para(p,"Technical offerings are illustrative and subject to agreed scope, availability, compatibility checks and written confirmation. No confidential solution recipes, proprietary working documents or customer-specific designs are included.",9.5);
 } else {
 p=newPage(pages,"Our perspective");p.y=680;heading(p,"Connected systems. Specific outcomes.");
 para(p,"KABO considers the relationships between networks, compute, security, workplaces and operational continuity. The following summary shows what each solution area may support without revealing client-specific architecture drawings or implementation procedures.",11);
 for(let i=0;i<KABO_CATALOGUE.length;i++){const s=KABO_CATALOGUE[i];p=ensure(pages,p,175,"Solutions / continued");heading(p,String(i+1).padStart(2,"0")+" / "+s.title);para(p,s.intro,10.4);para(p,"Illustrative scope: "+s.products.slice(0,5).map(x=>x[0]).join(", ")+".",9.8);p.y-=5;}
 p=newPage(pages,"Engagement / enquiry");p.y=680;heading(p,"How KABO approaches an enquiry");
 for(const [name,desc] of KABO_APPROACH){p=ensure(pages,p,100,"Engagement / continued");t(p,LEFT,p.y,name.toUpperCase(),14,"F2",blue);p.y-=22;para(p,desc,11,0,12)}
 p.y-=35;heading(p,"Start with a conversation");para(p,"www.kaboitgroup.co.za  |  info@kaboitgroup.co.za  |  +27 61 285 4418",10.5);para(p,"Public overview only. No confidential design methods, client information, project drawings or detailed configuration instructions are disclosed.",9.5);
 }
 return makePdf(pages);
}
