import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
let connection: DatabaseSync;
export function db(){
 if(connection)return connection;
 const folder=resolve(process.env.ATLAS_DATA_DIR || 'private/runtime');
 mkdirSync(folder,{recursive:true,mode:0o700});
 connection=new DatabaseSync(resolve(folder,'atlas.sqlite'));
 connection.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
 CREATE TABLE IF NOT EXISTS posts(slug TEXT PRIMARY KEY,title TEXT,category TEXT,date TEXT,excerpt TEXT,body TEXT);
 CREATE TABLE IF NOT EXISTS limits(id TEXT PRIMARY KEY, hits INTEGER,until INTEGER);
 CREATE TABLE IF NOT EXISTS tickets(hash TEXT PRIMARY KEY,kind TEXT,until INTEGER);`);
 return connection;
}
const digest=(s:string)=>createHash('sha256').update(s).digest();
export function matches(input:string, expected:string|undefined){
 return !!expected && /^[a-f0-9]{64}$/i.test(expected) && timingSafeEqual(digest(input),Buffer.from(expected,'hex'));
}
export function allow(id:string, max:number, seconds:number){
 const now=Math.floor(Date.now()/1000);
 db().prepare('DELETE FROM limits WHERE until<=?').run(now);
 const row=db().prepare('INSERT INTO limits VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET hits=hits+1 WHERE hits<? RETURNING hits').get(id,now+seconds,max);
 return !!row;
}
export function issue(kind:string,seconds:number){
 const token=randomBytes(32).toString('hex');
 db().prepare('DELETE FROM tickets WHERE until<=?').run(Date.now());
 db().prepare('INSERT INTO tickets VALUES(?,?,?)').run(digest(token).toString('hex'),kind,Date.now()+seconds*1000);
 return token;
}
export function valid(token:string|undefined,kind:string,consume=false){
 if(!token)return false;
 const where=' WHERE hash=? AND kind=? AND until>?';
 return !!db().prepare(consume?'DELETE FROM tickets'+where+' RETURNING hash':'SELECT hash FROM tickets'+where).get(digest(token).toString('hex'),kind,Date.now());
}