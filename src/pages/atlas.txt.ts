import {publicFiles} from '../server/files';
export const prerender=false;
export async function GET(){return new Response((await publicFiles()).map(f=>'# '+f.title+'\n'+f.href+'\n\n'+f.text).join('\n\n---\n\n'),{headers:{'Content-Type':'text/plain; charset=utf-8'}})}