import { generateKaboPdf } from "@/lib/kabo-pdf";
export const runtime="nodejs";
export async function GET(_request:Request,{params}:{params:Promise<{kind:string}>}){
 const {kind}=await params;
 if(kind!=="company-profile"&&kind!=="solutions-overview")return new Response("Document not found",{status:404});
 const body=generateKaboPdf(kind);
 const filename=kind==="company-profile"?"KABO-IT-Group-Company-Profile.pdf":"KABO-IT-Group-Solutions-Overview.pdf";
 return new Response(Buffer.from(body),{headers:{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="${filename}"`,"Cache-Control":"public, max-age=3600","X-Content-Type-Options":"nosniff"}});
}
