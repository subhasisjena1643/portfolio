import * as THREE from 'three';
import {buildCity} from './city-art';
import {venues} from '../data/district';

const canvas=document.querySelector<HTMLCanvasElement>('#world')!;
const map=document.querySelector<HTMLDialogElement>('#map')!;
const shelf=document.querySelector<HTMLDialogElement>('#venue')!;
const hint=document.querySelector<HTMLElement>('#hint')!;
const interact=document.querySelector<HTMLButtonElement>('#interact')!;
const scene=new THREE.Scene();
const camera=new THREE.OrthographicCamera(-20,20,16,-16,.1,180);
const light=new THREE.DirectionalLight(0xffdfad,2);
light.position.set(-20,36,18);scene.add(light);
const ambient=new THREE.HemisphereLight(0xfff2dd,0x747486,1.65);scene.add(ambient);
const city=buildCity(scene);
// Soft pools under the signs keep each stop recognizable on the night shift.
const bulbColors=[0xff9275,0x8ae5de,0xe293ed,0xffcf78];
const signs=venues.map((v,i)=>{const lamp=new THREE.PointLight(bulbColors[i],0,16,2);lamp.position.set(v.x,3,v.z);scene.add(lamp);return lamp});
const cube=new THREE.BoxGeometry(1,1,1);
const materials=new Map<number,THREE.MeshLambertMaterial>();
function block(parent:THREE.Group,color:number,x:number,y:number,z:number,w:number,h:number,d:number){
 if(!materials.has(color))materials.set(color,new THREE.MeshLambertMaterial({color,flatShading:true}));
 const box=new THREE.Mesh(cube,materials.get(color));box.scale.set(w,h,d);box.position.set(x,y,z);parent.add(box);return box;
}
function person(shirt:number,skin:number,cap:boolean){
 const root=new THREE.Group(),body=new THREE.Group();root.add(body);scene.add(root);
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(.55,10),new THREE.MeshBasicMaterial({color:0x19272f,transparent:true,opacity:.38,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.16;root.add(shadow);
 block(body,shirt,0,1.05,0,.66,.69,.39);block(body,skin,0,1.68,0,.56,.53,.52);
 block(body,cap?0xe95642:0x302831,0,1.96,-.03,.59,.17,.55);
 if(cap)block(body,0xe95642,0,1.9,.29,.6,.08,.27);
 for(const x of [-.13,.13])block(body,0x292836,x,1.69,.27,.07,.07,.04);
 const legs=[-.18,.18].map(x=>{const pivot=new THREE.Group();body.add(pivot);pivot.position.set(x,.78,0);block(pivot,0x274666,0,-.28,0,.27,.57,.31);block(pivot,0xf2dca5,0,-.63,.05,.29,.17,.4);return pivot});
 const arms=[-.43,.43].map(x=>{const p=new THREE.Group();body.add(p);p.position.set(x,1.32,0);block(p,shirt,0,-.11,0,.21,.26,.31);block(p,skin,0,-.36,0,.19,.29,.24);return p});
 return {root,body,legs,arms};
}
const player=person(0xe64e36,0xbd845e,true);player.root.position.set(0,0,1);
const people=[
 {actor:person(0x5bb8ad,0xaa764f,false),x:-5,z:0,axis:'z',message:'The last reel is upstairs at the single screen.'},
 {actor:person(0xe9ab48,0x976848,false),x:6,z:1,axis:'z',message:'Three old metro tokens fell near the crossroads.'},
 {actor:person(0xbf719d,0xc88c67,false),x:0,z:-4,axis:'x',message:'The bookseller keeps the manga beside the window.'}
];
const jacket=new THREE.MeshLambertMaterial({color:0xffcf37,emissive:0x392904});
function wear(){player.body.children[0] instanceof THREE.Mesh && (player.body.children[0].material=jacket);document.querySelector('#wear')!.textContent='Jacket equipped'}
document.querySelector('#wear')!.addEventListener('click',()=>{if(collected.length===3){wear();try{localStorage.setItem('blr-jacket','gold')}catch{}}});
const positions=[[-7,-4],[7,5],[0,-18]];
let collected:number[]=[];
try{const saved=JSON.parse(localStorage.getItem('blr-tokens-v1')||'[]');if(Array.isArray(saved))collected=[...new Set(saved.filter((v:unknown)=>typeof v==='number'&&[0,1,2].includes(v)))] as number[]}catch{}
const tokens=positions.map(([x,z],i)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.15,8),new THREE.MeshBasicMaterial({color:0xffce50}));m.rotation.z=Math.PI/2;m.position.set(x,1,z);m.visible=!collected.includes(i);scene.add(m);return m});
try{if(collected.length===3&&localStorage.getItem('blr-jacket')==='gold')wear()}catch{}
function count(){document.querySelector('#count')!.textContent=collected.length+' / 3'}count();
const keys=new Set<string>();
const keyMap:Record<string,string>={KeyW:'up',ArrowUp:'up',KeyS:'down',ArrowDown:'down',KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right'};
let height=0,velocity=0,walk=0,seconds=0,night=false,lastClock='',toastUntil=0;
function announce(text:string){hint.textContent=text;toastUntil=seconds+4}
function doJump(){if(height<=.001)velocity=5.5}
function showVenue(id:string){document.querySelectorAll<HTMLElement>('[data-venue]').forEach(el=>el.hidden=el.dataset.venue!==id);shelf.showModal();keys.clear()}
function nearest(){
 const p=player.root.position;
 return venues.map(v=>({v,dist:Math.hypot(p.x-v.x,p.z-v.z)})).sort((a,b)=>a.dist-b.dist)[0];
}
function explore(){const stop=nearest();if(stop.dist<4.5){showVenue(stop.v.id);return}
 const npc=people.find(n=>n.actor.root.position.distanceTo(player.root.position)<3.2);if(npc){announce(npc.message);return}announce('Nearby: '+stop.v.name+'. Follow the street or use Map.') }
document.querySelector('#directory')!.addEventListener('click',()=>{map.showModal();keys.clear()});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>{b.closest('dialog')?.close();canvas.focus({preventScroll:true})}));
document.querySelectorAll<HTMLButtonElement>('[data-travel]').forEach(b=>b.onclick=()=>{const stop=venues.find(v=>v.id===b.dataset.travel)!;player.root.position.set(stop.x,0,stop.z);height=velocity=0;cameraTarget.copy(player.root.position);map.close();showVenue(stop.id)});
document.querySelectorAll<HTMLButtonElement>('[data-move]').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(b.dataset.move!)};b.onlostpointercapture=()=>keys.delete(b.dataset.move!)});
document.querySelector('#jump')!.addEventListener('click',doJump);interact.onclick=explore;
window.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey||(e.target as Element).closest('input,textarea'))return;
 if(keyMap[e.code]){e.preventDefault();keys.add(keyMap[e.code])}else if(e.code==='Space'&&!(e.target as Element).closest('button,a')){e.preventDefault();if(!e.repeat)doJump()}else if(e.code==='KeyE'&&!e.repeat)explore()});
window.addEventListener('keyup',e=>keys.delete(keyMap[e.code]));window.addEventListener('blur',()=>keys.clear());
const cameraTarget=new THREE.Vector3(0,0,1);
let renderer:THREE.WebGLRenderer|undefined;
try{renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'low-power'});renderer.outputColorSpace=THREE.SRGBColorSpace}catch{hint.textContent='3D graphics unavailable. Open Map to visit every stop.'}
function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;if(!renderer||!w||!h)return;const aspect=w/h;const span=aspect<1?17:16;camera.left=-span*aspect;camera.right=span*aspect;camera.top=span;camera.bottom=-span;camera.updateProjectionMatrix();const scale=Math.min(1,850/w,560/h);renderer.setSize(Math.round(w*scale),Math.round(h*scale),false)}
new ResizeObserver(resize).observe(canvas);resize();
function clock(){const date=new Date(),time=date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});if(time===lastClock)return;lastClock=time;
 const hr=date.getHours();night=hr>=19||hr<6;const dusk=hr===18||hr===6;
 document.querySelector('#local-time')!.textContent=time;document.querySelector('#sky')!.textContent=night?'NIGHT SHIFT':dusk?'GOLDEN HOUR':'DAY SHIFT';
 signs.forEach(s=>s.intensity=night?58:dusk?25:0);
 const sky=night?0x404974:dusk?0xe3a07d:0xa7cfdf;scene.background=new THREE.Color(sky);scene.fog=new THREE.Fog(sky,68,145);
 ambient.color.setHex(night?0xb3c6ff:0xffeed9);ambient.intensity=night?1.05:1.7;light.color.setHex(night?0xaaaef9:0xffdaa2);light.intensity=night?1.15:2.15;
}
function canWalk(x:number,z:number){return Math.abs(x)<29&&Math.abs(z)<29&&!city.solids.some(s=>Math.abs(x-s.x)<s.w/2+.32&&Math.abs(z-s.z)<s.d/2+.32)}
function stride(actor:ReturnType<typeof person>,phase:number,amount:number){actor.legs.forEach((l,i)=>{const swing=Math.sin(phase+i*Math.PI)*amount;l.rotation.x=swing;actor.arms[i].rotation.x=-swing})}
const cameraOffset=new THREE.Vector3(13,27,31);
let prior=performance.now(),lastFrame=0;
function loop(now:number){requestAnimationFrame(loop);if(document.hidden||now-lastFrame<32)return;lastFrame=now;const dt=Math.min(.06,(now-prior)/1000);prior=now;seconds+=dt;clock();
 if(!renderer)return;
 const modal=!!document.querySelector('dialog[open]');if(modal)keys.clear();
 const dx=Number(keys.has('right'))-Number(keys.has('left')),dz=Number(keys.has('down'))-Number(keys.has('up'));
 const p=player.root.position;const length=Math.hypot(dx,dz);
 if(length){document.body.classList.add('exploring');const x=(dx*.922+dz*.387)/length,z=(-dx*.387+dz*.922)/length;const step=dt*6;
 if(canWalk(p.x+x*step,p.z))p.x+=x*step;if(canWalk(p.x,p.z+z*step))p.z+=z*step;player.root.rotation.y=Math.atan2(x,z);walk+=dt*12}
 if(!modal){velocity-=dt*14;height=Math.max(0,height+velocity*dt);if(!height)velocity=0}
 player.body.position.y=height;stride(player,walk,length?.5:0);
 people.forEach((n,i)=>{const speed=night?.24:.47;const t=seconds*speed+i*2;const dist=Math.sin(t)*(night?2.2:4.4);n.actor.root.position.set(n.x+(n.axis==='x'?dist:0),0,n.z+(n.axis==='z'?dist:0));n.actor.root.rotation.y=(n.axis==='x'?Math.PI/2:0)+(Math.cos(t)<0?Math.PI:0);stride(n.actor,t*8,.33)});
 tokens.forEach((m,i)=>{if(!m.visible)return;m.rotation.y=seconds*2;m.position.y=1.1+.16*Math.sin(seconds*2+i);if(Math.hypot(p.x-m.position.x,p.z-m.position.z)<1.2){m.visible=false;collected.push(i);try{localStorage.setItem('blr-tokens-v1',JSON.stringify(collected))}catch{}count();announce(collected.length===3?'Last token! Your gold jacket is waiting at Pixel Palace.':'Found a metro token.')}});
 const prize=document.querySelector<HTMLElement>('#prize');if(prize)prize.hidden=collected.length!==3;
 const stop=nearest();if(seconds>toastUntil)hint.textContent=stop.dist<4.5?'Explore · '+stop.v.name:people.some(n=>n.actor.root.position.distanceTo(p)<3.2)?'Explore · talk to a local':'Bengaluru · Market Cross';
 cameraTarget.lerp(p,1-Math.exp(-dt*5));camera.position.copy(cameraTarget).add(cameraOffset);camera.lookAt(cameraTarget.x,1,cameraTarget.z);city.animate(seconds,night);renderer.render(scene,camera);
}
clock();requestAnimationFrame(loop);
