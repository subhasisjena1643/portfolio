import sharp from 'sharp';
import type { APIContext } from 'astro';
import { getPost } from '../../../data/journal';
export const prerender=false;
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]!));
function wrap(s:string,width:number,limit:number){
 const lines:string[]=[];let line='';
 for(const word of s.split(/\s+/).flatMap(w=>w.match(new RegExp('.{1,'+width+'}','gu'))||[])){
   if(line && (line+' '+word).length>width){lines.push(line);line=''}line+=(line?' ':'')+word;
 } if(line)lines.push(line);
 if(lines.length>limit){lines.length=limit;lines[limit-1]+='…'}return lines;
}
export async function GET({params}:APIContext){
 const p=getPost(params.slug||'');if(!p)return new Response(null,{status:404});
 const lines=(s:string,n:number,max:number,y:number,step:number)=>wrap(s,n,max).map((line,i)=>'<tspan x="72" y="'+(y+i*step)+'">'+escape(line)+'</tspan>').join('');
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f3f1eb"/><path d="M72 100H1128 M72 535H1128" stroke="#9c9e92"/><g fill="#18211f" font-family="sans-serif"><text x="72" y="70" font-size="26">ATLAS OF INVISIBLE THINGS  /  JOURNAL</text><text x="72" y="155" font-size="24">'+escape(p.category)+'  ·  '+escape(p.date)+'</text><text font-size="62" font-family="serif">'+lines(p.title,27,3,230,64)+'</text><text font-size="26">'+lines(p.excerpt,60,3,425,34)+'</text><text x="72" y="590" font-size="27">Subhasis Jena</text></g><circle cx="1102" cy="61" r="15" fill="#e85232"/></svg>';
 const bytes=await sharp(new TextEncoder().encode(svg)).png().toBuffer();
 return new Response(new Uint8Array(bytes),{headers:{'Content-Type':'image/png'}});
}