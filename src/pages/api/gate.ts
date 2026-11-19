import type { APIRoute } from 'astro';
import {pbkdf2Sync,timingSafeEqual,randomUUID} from 'node:crypto';
import {allow,db,issue,matches,valid} from '../../server/store';
export const prerender=false;
export const POST:APIRoute=async({request,url,cookies,clientAddress})=>{
 const reply=(data:object,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
 if(request.headers.get('origin')!==url.origin || request.headers.get('content-type')!=='application/json')return reply({},403);
 const reader=request.body?.getReader();if(!reader)return reply({},400);
 const chunks:Uint8Array[]=[];let size=0;
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>100000){await reader.cancel();return reply({},413)}chunks.push(value)}
 let p;try{p=JSON.parse(Buffer.concat(chunks).toString())}catch{return reply({},400)}
 if(!p || typeof p!=='object')return reply({},400);
 const cookie={httpOnly:true,secure:url.protocol==='https:',sameSite:'strict' as const,path:'/'};
 if(p.action==='guide'){
  const owner=valid(cookies.get('atlas_owner')?.value,'owner');
  return reply(owner?{owner:'Open the passphrase receiver with Ctrl + Alt + Space. Enter your owner sequence, answer your security question and enter your publishing password. The writing desk is at /journal/write/ during your signed-in session.'}:{});
 }
 if(p.action==='publish'){
  if(!valid(cookies.get('atlas_owner')?.value,'owner'))return reply({},403);
  for(const [k,max] of Object.entries({title:120,excerpt:240,body:60000,category:30}))if(typeof p[k]!=='string'||!p[k].trim()||p[k].length>max)return reply({error:'Check '+k},400);
  const slug=(p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,64)||'entry')+'-'+randomUUID().slice(0,8);
  db().prepare('INSERT INTO posts VALUES(?,?,?,?,?,?)').run(slug,p.title.trim(),p.category.trim(),new Date().toISOString().slice(0,10),p.excerpt.trim(),p.body.trim());
  return reply({url:'/journal/'+slug+'/'},201);
 }
 if(p.action==='logout'){valid(cookies.get('atlas_owner')?.value,'owner',true);cookies.delete('atlas_owner',{path:'/'});return reply({url:'/journal/'})}
 if(!allow('gate:'+clientAddress,10,900)||!allow('gate:all',120,900))return reply({error:'Try again later.'},429);
 if(typeof p.value!=='string'||p.value.length>512)return reply({},400);
 if(p.action==='discover'){
  if(matches(p.value,process.env.ATLAS_BONUS_HASH))return reply({url:'/arcade/'});
  if(matches(p.value,process.env.ATLAS_PIPER_HASH)){cookies.set('atlas_receiver',issue('piper',1800),{...cookie,maxAge:1800});return reply({receiver:true})}
  if(matches(p.value,process.env.ATLAS_OWNER_HASH)&&process.env.ATLAS_QUESTION&&process.env.ATLAS_ANSWER_HASH&&process.env.ATLAS_PASSWORD_KEY){
   cookies.set('atlas_challenge',issue('challenge',120),{...cookie,maxAge:120});return reply({question:process.env.ATLAS_QUESTION});
  }
 }
 if(p.action==='answer' && valid(cookies.get('atlas_challenge')?.value,'challenge',true) && matches(p.value,process.env.ATLAS_ANSWER_HASH)){
  cookies.delete('atlas_challenge',{path:'/'});cookies.set('atlas_proof',issue('password',120),{...cookie,maxAge:120});return reply({password:true});
 }
 if(p.action==='password' && valid(cookies.get('atlas_proof')?.value,'password',true)){
  const [salt,hash]=(process.env.ATLAS_PASSWORD_KEY||'').split('.');
  if(!/^[a-f0-9]{32}$/i.test(salt)||!/^[a-f0-9]{64}$/i.test(hash)||!timingSafeEqual(pbkdf2Sync(p.value,Buffer.from(salt,'hex'),600000,32,'sha256'),Buffer.from(hash,'hex')))return reply({},403);
  cookies.delete('atlas_proof',{path:'/'});cookies.set('atlas_owner',issue('owner',1800),{...cookie,maxAge:1800});return reply({url:'/journal/write/'});
 }
 return reply({error:'No signal.'},403);
};