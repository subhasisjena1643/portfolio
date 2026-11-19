import { db } from '../server/store';
export interface Entry { title:string;category:string;date:string;excerpt:string;body:string }
export interface Post extends Entry {slug:string}
const files=import.meta.glob<Entry>('../content/journal/*.json',{eager:true,import:'default'});
const seed=Object.entries(files).map(([path,p])=>({...p,slug:path.split('/').pop()!.replace(/\.json$/,'')}));
export function getEntries():Post[]{
 const posts=db().prepare('SELECT * FROM posts ORDER BY rowid DESC').all() as unknown as Post[];
 return [...posts,...seed.slice().sort((a,b)=>b.date.localeCompare(a.date))];
}
export function getPost(slug:string){
 return db().prepare('SELECT * FROM posts WHERE slug=?').get(slug) as unknown as Post|undefined || seed.find(p=>p.slug===slug);
}