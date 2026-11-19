import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash,randomUUID,pbkdf2Sync,randomBytes} from 'node:crypto';
import assert from 'node:assert/strict';
const folder=await mkdtemp(join(tmpdir(),'atlas-qa-')), origin='http://127.0.0.1:4037';
const hash=s=>createHash('sha256').update(s).digest('hex'),command=randomUUID(),answer=randomUUID();
const salt=randomBytes(16),password=randomUUID(),piper=randomUUID();
const child=spawn(process.execPath,['dist/server/entry.mjs'],{env:{...process.env,HOST:'127.0.0.1',PORT:'4037',ATLAS_DATA_DIR:folder,ATLAS_PASSWORD_KEY:salt.toString('hex')+'.'+pbkdf2Sync(password,salt,600000,32,'sha256').toString('hex'),ATLAS_PIPER_HASH:hash(piper),ATLAS_OWNER_HASH:hash(command),ATLAS_QUESTION:'Test challenge',ATLAS_ANSWER_HASH:hash(answer),OPENAI_API_KEY:''},stdio:'ignore',windowsHide:true});
const jar=new Map();
const cookies=()=>[...jar].map(([k,v])=>k+'='+v).join('; ');
async function gate(data,status){
 const r=await fetch(origin+'/api/gate',{method:'POST',headers:{origin,cookie:cookies(),'Content-Type':'application/json'},body:JSON.stringify(data)});
 for(const val of r.headers.getSetCookie()){const [k,v]=val.split(';')[0].split('=');jar.set(k,v)}
 const body=await r.text();assert.equal(r.status,status,data.action+' '+body);return JSON.parse(body);
}
try{
 for(let i=0;i<40;i++){try{if((await fetch(origin)).ok)break}catch{}await new Promise(r=>setTimeout(r,250))}
 assert.equal((await fetch(origin+'/journal/write/')).status,404);
 await gate({action:'publish'},403);
 await gate({action:'discover',value:command},200);
 await gate({action:'answer',value:answer},200);
 await gate({action:'publish'},403);
 await gate({action:'password',value:password},200);
 assert.equal((await fetch(origin+'/journal/write/',{headers:{cookie:cookies()}})).status,200);
 const {url}=await gate({action:'publish',title:'Temporary signal verification',category:'Progress',excerpt:'Test entry',body:'A test.'},201);
 for(const path of [url,'/journal/','/terminal/','/atlas.txt','/'])assert.match(await(await fetch(origin+path)).text(),/Temporary signal verification/);
 assert.equal((await fetch(origin+url+'snapshot.png')).headers.get('content-type'),'image/png');
 async function ask(message){const r=await fetch(origin+'/api/piper',{method:'POST',headers:{origin,cookie:cookies()},body:message});assert.equal(r.status,200);for(const val of r.headers.getSetCookie()){const [k,v]=val.split(';')[0].split('=');jar.set(k,v)}return r.json()}
 assert.equal((await ask('hi piper')).chat,true);
 assert.equal((await ask("what's the passphrase to open the city?")).url,'/arcade/');
 assert.equal((await ask("how do I open the blog zone?")).url,'/journal/');
 assert.match((await ask("how do I open the blog writing page?")).text,/Ctrl \+ Alt \+ Space/);
 await gate({action:'discover',value:piper},200);
 const p=await fetch(origin+'/api/piper',{method:'POST',headers:{origin,cookie:cookies()},body:'ClassAnalyzer'});assert.equal((await p.json()).title,'ClassAnalyzer');
 await gate({action:'logout'},200);await gate({action:'publish'},403);
 console.log('Verified owner challenge, publishing, both editions, PNG, Piper lookup and sign-out.');
}finally{const stopped=new Promise(resolve=>child.once('exit',resolve));child.kill();await stopped;await rm(folder,{recursive:true,force:true})}