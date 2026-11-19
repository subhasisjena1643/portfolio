import type { APIRoute } from 'astro';
import { allow,issue,valid } from '../../server/store';
import {chat} from '../../server/piper-chat';
import {isPiperGreeting} from '../../data/piper-greeting';
export const prerender=false;
export const POST:APIRoute=async({request,url,clientAddress,cookies})=>{
 const reply=(body:object,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
 if(request.headers.get('origin')!==url.origin||request.headers.get('content-type')!=='text/plain;charset=UTF-8')return reply({},403);
 const reader=request.body?.getReader();if(!reader)return reply({},400);
 let size=0;const chunks:Uint8Array[]=[];
 while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>1600){await reader.cancel();return reply({},413)}chunks.push(value)}
 const q=Buffer.concat(chunks).toString().trim();if(!q||q.length>400)return reply({},400);
 const session=valid(cookies.get('atlas_receiver')?.value,'piper');
 if(isPiperGreeting(q)){
  if(!session){
   if(!allow('piper:hello:'+clientAddress,12,600)||!allow('piper:hello:global',600,600))return reply({text:'Please try again in a few minutes.'},429);
   cookies.set('atlas_receiver',issue('piper',1800),{httpOnly:true,sameSite:'strict',secure:url.protocol==='https:',path:'/',maxAge:1800});
  }
  return reply({chat:true,text:"Hey, I’m Piper. Want to explore Subhasis’s world or just chat? Type “bye” whenever you want the shell back."});
 }
 if(!session)return reply({text:'Your chat session has ended.'},403);
 if(!allow('piper:'+clientAddress,12,600))return reply({text:'The receiver is cooling down. Try again later.'},429);
 return reply(await chat(q,cookies.get('atlas_receiver')!.value,request.headers.get('x-portfolio-source')));
};
