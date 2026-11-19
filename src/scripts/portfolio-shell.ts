import {isPiperGreeting} from '../data/piper-greeting';
import {piperPath} from '../data/api-paths';
interface PublicFile { file: string; title: string; href: string; text: string }
const files: PublicFile[] = JSON.parse(document.querySelector('#public-files')!.textContent!);
const dirs = new Map(Object.entries({ about:'/about/', work:'/work/', research:'/#research', journal:'/journal/' }));
const main = document.querySelector('main')!;
const input = document.querySelector<HTMLInputElement>('#cmd')!;
const log = document.querySelector<HTMLElement>('#shell-log')!;
const slide = document.querySelector<HTMLAnchorElement>('[data-edition]')!;
const cwd = document.querySelector('#cwd')!;
let dir = main.dataset.directory || '';
const history: string[] = [];
let cursor = 0;
let draft = '';

function print(value: string, echo = false) {
  const line = document.createElement('pre');
  if (echo) line.className = 'echo';
  line.textContent = value || ' ';
  log.append(line);
}
function prompt() { return 'visitor@atlas:' + cwd.textContent + '$' }
function echo(raw: string) { print(prompt() + ' ' + raw, true) }
function resolve(raw: string) {
  const value = raw.trim().replace(/^["'](.*)["']$/, '$1').replaceAll('\\','/');
  const absolute = /^(?:~(?:\/|$)|\/)/.test(value);
  const parts = absolute || !dir ? [] : [dir];
  for (const segment of value.replace(/^~(?=\/|$)/,'').split('/')) {
    if (segment === '..') parts.pop();
    else if (segment && segment !== '.') parts.push(segment);
  }
  return parts.join('/');
}
function contents(path: string) {
  if (!path) return [...dirs.keys()].map(d=>d+'/').concat('atlas.txt');
  return files.filter(f=>f.file.startsWith(path+'/')).map(f=>f.file.slice(path.length+1));
}
function context(entry?: PublicFile) {
  cwd.textContent = '~' + (dir ? '/'+dir : '');
  slide.href = entry?.href || dirs.get(dir) || '/';
  const url = new URL('/terminal/', location.origin);
  if (entry) url.searchParams.set('file', entry.file);
  else if (dir) url.searchParams.set('dir', dir);
  window.history.replaceState(null, '', url);
}
function read(entry: PublicFile) {
  print(entry.title+'\n\n'+entry.text);
  if (entry.file.startsWith('journal/')) {
    const a = document.createElement('a');
    a.href = entry.href+'snapshot.png'; a.download=''; a.textContent='snapshot.png'; log.append(a);
  }
  context(entry);
}
const aliases: Record<string,string> = {
  dir:'ls','get-childitem':'ls',type:'cat','get-content':'cat',chdir:'cd','set-location':'cd',
  'get-location':'pwd',cls:'clear','clear-host':'clear','get-help':'help'
};
const commands = ['ls','cd','pwd','cat','find','whoami','history','clear','help','exit'];
function run(raw: string) {
  const [,name,arg=''] = /^(\S+)(?:\s+([\s\S]*))?$/.exec(raw)!;
  const op = aliases[name.toLowerCase()] || name.toLowerCase();
  const path = resolve(arg);
  switch(op) {
    case 'ls':
      if (!path || dirs.has(path)) print(contents(path).join('  '));
      else if (files.some(f=>f.file===path) || path==='atlas.txt') print(path);
      else print('ls: no such file or directory: '+arg);
      break;
    case 'cd':
      if (!arg || !path || dirs.has(path)) { dir = arg ? path : ''; context() }
      else print('cd: no such directory: '+arg);
      break;
    case 'pwd': print('/home/visitor'+(dir?'/'+dir:'')); break;
    case 'cat': {
      if (path==='atlas.txt') { print(files.map(f=>f.title+'\n'+f.href+'\n\n'+f.text).join('\n\n')); break }
      const entry = files.find(f=>f.file===path);
      if (entry) read(entry);
      else print(!arg?'usage: cat <file>':dirs.has(path)?'cat: '+arg+': is a directory':'cat: no such file: '+arg);
      break;
    }
    case 'find': {
      const query=arg.toLowerCase();
      print(files.filter(f=>(f.file+' '+f.title).toLowerCase().includes(query)).map(f=>'~/'+f.file).join('\n') || 'No matches.');
      break;
    }
    case 'whoami': print('visitor'); break;
    case 'history': print(history.map((s,i)=>(i+1)+'  '+s).join('\n')); break;
    case 'clear': log.replaceChildren(); break;
    case 'help': print('ls [path]     list files and directories\ncd [path]     change directory\npwd           print working directory\ncat <file>    read a portfolio entry\nfind <text>   search names and paths\nwhoami        print session user\nhistory       show command history\nclear         clear the screen\nexit          return to the portfolio\n\nTab completes paths. Up and Down recall commands.\ndir, type, cls and PowerShell aliases also work.'); break;
    case 'exit': location.assign(slide.href); break;
    default: print(name+': command not found');
  }
}
let chatting = false;
let pending = false;
let lastSource = '';

function setChat(active: boolean) {
  chatting = active;
  document.querySelector<HTMLElement>('#shell-prefix')!.hidden = active;
  document.querySelector<HTMLElement>('#chat-prefix')!.hidden = !active;
  input.setAttribute('aria-label',active ? 'Message Piper' : 'Shell command');
  if(active) input.maxLength=400;
  else input.removeAttribute('maxlength');
  lastSource='';
}

async function talk(message: string) {
  pending=true;
  const waiting=document.createElement('pre');
  waiting.setAttribute('role','status');
  waiting.textContent='Piper …';
  log.append(waiting);
  input.scrollIntoView({block:'nearest'});
  try {
    const response=await fetch(piperPath,{
      method:'POST',body:message,signal:AbortSignal.timeout(15000),
      headers:lastSource ? {'x-portfolio-source':lastSource} : {}
    });
    const result=await response.json();
    if(response.status===403) setChat(false);
    if(response.ok && result.chat) setChat(true);
    waiting.textContent='Piper › '+(result.text || 'I couldn’t receive that message. Please try again.');
    if(response.ok && typeof result.url==='string' && result.url.startsWith('/') && !result.url.startsWith('//')){
      const source=document.createElement('a');
      source.href=result.url;source.textContent=result.title || 'Read more';
      lastSource=result.url;waiting.append('\n        ',source);
    }
  } catch {
    waiting.textContent='Piper › I couldn’t reach the receiver. Please try again.';
  } finally {
    pending=false;
    input.scrollIntoView({block:'nearest'});
  }
}

document.querySelector<HTMLFormElement>('#prompt')!.onsubmit = async e => {
  e.preventDefault();
  if(pending)return;
  const raw = input.value.trim();
  if(chatting){
    if(!raw)return;
    print('You › '+raw,true); input.value='';
    if(/^(?:bye|goodbye|exit|quit|back to shell)[.!]?$/i.test(raw)){
      setChat(false);print('Piper › Back to the shell.');
    } else await talk(raw);
  } else {
    echo(raw); input.value=''; draft='';
    if(isPiperGreeting(raw)) await talk(raw);
    else if(raw){history.push(raw); cursor=history.length; run(raw)}
  }
  input.scrollIntoView({block:'nearest'});
};
input.addEventListener('keydown', e => {
  if(chatting || pending)return;
  if (e.key==='ArrowUp' || e.key==='ArrowDown') {
    e.preventDefault(); if(cursor===history.length) draft=input.value;
    cursor=Math.max(0,Math.min(history.length,cursor+(e.key==='ArrowUp'?-1:1)));
    input.value=history[cursor]??draft; input.setSelectionRange(input.value.length,input.value.length);
  } else if(e.ctrlKey && e.key.toLowerCase()==='l') {
    e.preventDefault(); log.replaceChildren();
  } else if(e.ctrlKey && e.key.toLowerCase()==='c' && !window.getSelection()?.toString() && input.selectionStart===input.selectionEnd) {
    e.preventDefault(); echo(input.value+'^C'); input.value=''; cursor=history.length;
  } else if(e.key==='Tab' && !e.shiftKey && input.value) {
    e.preventDefault();
    const value=input.value, split=value.lastIndexOf(' '), fragment=value.slice(split+1);
    const slash=fragment.lastIndexOf('/'), parent=fragment.slice(0,slash+1);
    const choices=split<0 ? commands : contents(resolve(parent)).map(s=>parent+s);
    const matches=choices.filter(s=>s.startsWith(fragment));
    if(matches.length===1) input.value=value.slice(0,split+1)+matches[0]+(matches[0].endsWith('/')?'':' ');
    else if(matches.length>1){echo(value);print(matches.join('  '));input.scrollIntoView({block:'nearest'})}
  }
});
main.addEventListener('click', e=>{
  if(!(e.target as Element).closest('dialog,a,input,button') && !window.getSelection()?.toString()) input.focus({preventScroll:true});
});
if(matchMedia('(pointer:fine)').matches) input.focus({preventScroll:true});
