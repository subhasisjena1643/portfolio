import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

if (existsSync('.env')) loadEnvFile('.env');

const apiAliases=['gate','piper'].map(name=>{
  const canonical='/api/'+name;
  const path=process.env['PUBLIC_ATLAS_'+name.toUpperCase()+'_PATH'] || canonical;
  if(!/^\/api\/(?:[a-z0-9_-]+\/)*[a-z0-9_-]+$/.test(path))throw new Error('Invalid same-origin API path for '+name);
  return {name,path,canonical};
});
if(new Set(apiAliases.map(r=>r.path)).size!==2 || apiAliases.some(r=>apiAliases.some(other=>r!==other && r.path===other.canonical)))throw new Error('API paths must be distinct');

export default defineConfig({
  integrations:[{name:'portfolio-api-paths',hooks:{'astro:config:setup':({injectRoute})=>{
    for(const route of apiAliases)if(route.path!==route.canonical)injectRoute({pattern:route.path,entrypoint:'./src/pages/api/'+route.name+'.ts',prerender:false});
  }}}],
  adapter: node({mode:'standalone'}),
  site: process.env.SITE_URL || undefined,
  output:'static',
  security:{allowedDomains:process.env.SITE_URL ? [{hostname:new URL(process.env.SITE_URL).hostname,protocol:new URL(process.env.SITE_URL).protocol.slice(0,-1)}] : [{hostname:'localhost'},{hostname:'127.0.0.1'}]},
  devToolbar:{enabled:false},
  vite:{css:{postcss:{}},server:{fs:{deny:['.env','.env.*','*.{crt,pem}','**/.git/**','**/private/**','**/OWNER.md','**/scripts/configure-owner.ps1','**/*.sqlite*']}}}
});