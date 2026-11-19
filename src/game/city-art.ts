import * as THREE from 'three';

type Footprint = {x:number;z:number;w:number;d:number};
type Brick = [number,number,number,number,number,number,string];

/** Hand-built miniature. Static architecture shares instanced geometry. */
export function buildCity(scene:THREE.Scene){
  const solids:Footprint[]=[], bricks:Brick[]=[], lamps:Brick[]=[];
  const cube=new THREE.BoxGeometry();
  const matte=new THREE.MeshLambertMaterial({color:0xffffff});
  const lit=new THREE.MeshLambertMaterial({color:0xffffff,emissive:0xffc58b,emissiveIntensity:0});
  const ink='#263449',cream='#f3daab',sea='#438b78',mango='#ffc45c',coral='#db624c',plum='#8d638f';
  function brick(x:number,y:number,z:number,w:number,h:number,d:number,c:string,glow=false){
    (glow?lamps:bricks).push([x,y,z,w,h,d,c]);
  }
  const solid=(x:number,z:number,w:number,d:number)=>solids.push({x,z,w,d});
  const tile=(x:number,z:number,w:number,d:number,c:string)=>brick(x,.035,z,w,.05,d,c);
  let seed=173;
  function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
  function instance(parent:THREE.Object3D,parts:Brick[],material:THREE.Material){
    const mesh=new THREE.InstancedMesh(cube,material,parts.length);
    const pose=new THREE.Object3D(),color=new THREE.Color();
    parts.forEach(([x,y,z,w,h,d,tint],i)=>{
      pose.position.set(x,y,z);pose.scale.set(w,h,d);pose.updateMatrix();
      mesh.setMatrixAt(i,pose.matrix);mesh.setColorAt(i,color.set(tint));
    });
    mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);
  }
  function paint(x:number,y:number,z:number,w:number,h:number,face:number,draw:(ctx:CanvasRenderingContext2D,W:number,H:number)=>void){
    const canvas=document.createElement('canvas');canvas.width=256;canvas.height=Math.max(40,Math.round(256*h/w));
    const ctx=canvas.getContext('2d');if(!ctx)return;draw(ctx,canvas.width,canvas.height);
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=THREE.NearestFilter;
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture}));
    mesh.position.set(x,y,z);mesh.rotation.y=face>0?0:Math.PI;scene.add(mesh);
  }
  function board(x:number,y:number,z:number,w:number,h:number,face:number,title:string,sub:string,bg:string,fg=cream){
    paint(x,y,z,w,h,face,(ctx,W,H)=>{
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);ctx.fillStyle=fg;
      ctx.fillRect(4,4,W-8,2);ctx.fillRect(4,H-6,W-8,2);
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.font='900 '+Math.round(Math.min(H*.49,W/(title.length*.64)))+'px monospace';ctx.fillText(title,W/2,H*.4);
      ctx.font='bold '+Math.round(H*.19)+'px monospace';ctx.fillText(sub,W/2,H*.77);
    });
  }
  function poster(x:number,z:number,face:number,even:boolean){
    paint(x,1.58,z,1.2,1.77,face,(ctx,W,H)=>{
      ctx.fillStyle=cream;ctx.fillRect(0,0,W,H);ctx.fillStyle=even?coral:sea;ctx.fillRect(11,11,W-22,H-22);
      ctx.fillStyle=mango;ctx.fillRect(39,38,95,86);ctx.fillStyle=ink;
      for(let i=0;i<9;i++)ctx.fillRect(11+i*26,165+Math.sin(i*.86)*36,27,129);
      ctx.fillRect(11,H-85,W-22,70);ctx.fillStyle=cream;ctx.textAlign='center';ctx.font='bold 30px monospace';ctx.fillText(even?'MATINEE':'NOCTURNE',W/2,H-42);
    });
  }
  brick(0,-.28,0,160,.5,160,'#89a07f');
  brick(0,-.055,0,9,.14,118,'#5b626b');brick(0,-.05,0,118,.14,8,'#565f67');
  for(const s of [-1,1]){
    for(let i=-44;i<=44;i+=3)if(Math.abs(i)>5){
      tile(s*.16,i,.1,1.5,'#e6c487');tile(i,s*.16,1.5,.1,'#e6c487');
    }
    for(let i=-3;i<=3;i++){tile(i*.98,s*5.7,.48,1.5,'#ddd5bb');tile(s*6.2,i*.93,1.6,.46,'#ddd5bb')}
  }
  for(const sx of [-1,1])for(const sz of [-1,1]){
    brick(sx*16,.005,sz*15.35,22,.16,22,'#c8bb9f');
    for(let i=0;i<11;i++){
      brick(sx*(5.95+i*2),.12,sz*4.42,1.97,.24,.33,i%2?'#4a5154':'#e8b856');
      brick(sx*(5.7+i*1.9),.091,sz*6.7,.028,.012,4.25,'#acaa91');
    }
  }
  const suburbs=['#9ba79c','#c3a393','#b69aa1','#94a4b3','#b7bc9e'];
  function house(x:number,z:number,w:number,h:number,d:number){
    brick(x,h/2,z,w,h,d,suburbs[Math.floor(rand()*suburbs.length)]);
    brick(x,h+.12,z,w+.4,.25,d+.4,cream);
    for(let y=1.5;y<h-.3;y+=1.9){
      brick(x,y-.67,z,w+.14,.15,d+.14,'#87918c');
      for(let dx=-w/2+.9;dx<w/2-.4;dx+=1.53){
        brick(x+dx,y,z+d/2+.025,.84,.91,.1,'#4d6877');
        if(rand()>.51)brick(x+dx-.15,y,z+d/2+.09,.28,.65,.04,'#e7ba7d',true);
      }
    }
    brick(x+w*.2,h+.75,z,1.36,1.25,1.4,'#505c62');brick(x+w*.2,h+1.43,z,1.51,.15,1.55,ink);
  }
  for(let i=0;i<16;i++){house(-55+i*7.3,-34-rand()*5,4.6+rand()*2,4+rand()*10,5);if(i%2===0)house(-49+i*7,39,5,4+rand()*4,5)}
  for(const side of [-1,1])for(let z=-24;z<29;z+=8)house(side*(34+rand()*5),z,5+rand()*2,4+rand()*6,5);

  function shop(x:number,side:number,name:string,subtitle:string,color:string,kind:number){
    const facade=side>0?11.7:-10.7, face=-side, depth=5.8, w=9.4, center=facade+side*depth/2;
    const h=[5.7,4.45,4.75,3.95][kind], front=(off:number)=>facade+face*off;
    solid(x,center,w,depth);brick(x,h/2,center,w,h,depth,color);brick(x,.26,center,w+.15,.45,depth+.15,ink);
    brick(x,h+.12,center,w+.5,.3,depth+.5,cream);brick(x,h+.35,center,w+.17,.19,depth+.17,color);
    brick(x+1.4,h+.78,center+.5,3.1,.75,2,kind===0?coral:'#bca78d');
    brick(x-2.9,h+.94,center-.3,1.3,1.15,1.25,'#49565a');
    for(let n=0;n<3;n++)brick(x-2.9,h+.42+n*.43,center-.3,1.42,.11,1.39,ink);
    brick(x+3.3,h+.53,center,1.25,.65,.8,'#b7b6a8');
    for(let i=0;i<4;i++)brick(x+3+i*.17,h+.54,center+face*.42,.07,.38,.035,ink);
    for(const dx of [-2.8,2.8]){
      brick(x+dx,1.55,front(.045),2.9,2.5,.13,cream);
      brick(x+dx,1.52,front(.12),2.53,2.1,.1,kind===0?'#593f53':'#315963');
      brick(x+dx,1.55,front(.18),.12,2.1,.1,color);brick(x+dx,1.55,front(.18),2.52,.09,.1,color);
    }
    brick(x,1.34,front(.07),1.57,2.65,.14,ink);brick(x,1.59,front(.16),1.2,1.81,.08,'#527e7d');
    brick(x+.43,1.22,front(.22),.11,.29,.09,mango);brick(x,.15,front(.48),2.1,.24,.96,'#e4d6b5');
    brick(x,3.17,front(.53),w+.4,.25,1.2,ink);
    for(let i=0;i<16;i++)brick(x-w/2+(i+.5)*w/16,3.05,front(.99),w/16,.42,.31,i%2?cream:color);
    const sy=kind===3?4.17:h-.03;
    brick(x,sy,front(.18),w-.15,1.35,.35,ink);
    board(x,sy,front(.37),w-.28,1.23,face,name,subtitle,['#863c48','#345e62','#4c375d','#255f50'][kind]);
    board(x,h-.92,center+side*(depth/2+.02),w-.45,1.3,side,name,subtitle,ink);
    if(kind===0){
      for(let n=0;n<22;n++)brick(x-4.35+n*.41,sy+.69,front(.31),.14,.15,.15,mango,true);
      poster(x-2.73,front(.26),face,true);poster(x+2.73,front(.26),face,false);
      for(const dx of [-3.9,3.9])brick(x+dx,h+.56,front(.01),.56,1.13,.75,coral);
      brick(x,h+.86,front(.01),3.4,1.6,.65,color);brick(x,h+1.75,front(.01),2.3,.24,.65,cream);
      board(x,h+.99,front(.36),2.94,.92,face,'35 MM','PICTURE HOUSE',ink,mango);
    }
    if(kind===1)for(const dx of [-2.7,2.7])for(let row=0;row<2;row++){
      for(let b=0;b<9;b++)brick(x+dx-.94+b*.23,.94+row*.85,front(.26),.17,.31+(b%3)*.09,.09,[coral,mango,cream,sea,plum][b%5]);
      brick(x+dx,.68+row*.85,front(.29),2.2,.12,.15,'#aa825b');
    }
    if(kind===2)for(const dx of [-2.85,2.85]){
      brick(x+dx,1.32,front(.45),.94,2.32,.78,plum);brick(x+dx,1.68,front(.85),.68,.59,.07,'#74d7c0',true);
      brick(x+dx,1.12,front(.89),.88,.17,.32,ink);brick(x+dx-.22,1.29,front(.89),.12,.19,.12,coral);
    }
    if(kind===3){
      for(const dx of [-2.7,2.7]){
        brick(x+dx,1.1,front(.52),2.65,.95,.7,'#83a6a2');
        for(let i=0;i<5;i++)brick(x+dx-.88+i*.42,1.71,front(.51),.22,.3,.26,i%2?cream:'#bdc9c3');
      }
      brick(x+3.7,2.2,front(.51),.57,1.16,.57,'#b9c7b9');brick(x+3.7,2.86,front(.51),.65,.17,.65,'#596e6b');
    }
  }
  shop(-12,-1,'RANGA CINEMA','ಚಿತ್ರಮಂದಿರ  /  MATINEE',coral,0);
  shop(12,-1,'PAPER TIGER','ಪುಸ್ತಕ  /  BOOK SHOP','#68a69b',1);
  shop(-12,1,'PIXEL PALACE','VIDEO GAMES  /  TOKEN HALL','#93729b',2);
  shop(12,1,'FILTER COFFEE','ದರ್ಶಿನಿ  /  DARSHINI','#59956f',3);

  function tree(x:number,z:number,s:number,flower=false){
    solid(x,z,s*.58,s*.58);brick(x,.12,z,s*1.7,.2,s*1.7,'#b8a68b');
    brick(x,1.5*s,z,.59*s,3*s,.61*s,'#77634b');brick(x-.65*s,2.7*s,z,.98*s,.34*s,.38*s,'#745e49');
    brick(x+.45*s,2.94*s,z+.35*s,.62*s,.48*s,.74*s,'#685840');
    const leaves=flower?['#977293','#bb8aa7','#d6a6b7']:['#507c64','#659169','#8aa46a'];
    const crown=[[-1.1,3.25,-.2,2.25,.84,2.1],[.85,3.33,.28,2.44,.86,2.3],[-.21,3.87,-.16,2.94,.99,2.25],[.13,4.43,-.25,1.62,.43,1.5]];
    crown.forEach(([dx,y,dz,w,h,d],i)=>brick(x+dx*s,y*s,z+dz*s,w*s,h*s,d*s,leaves[i%3]));
    for(let i=0;i<9;i++)brick(x+(rand()-.5)*s*2.8,(3.8+rand()*.48)*s,z+(rand()-.5)*s*1.88,.41*s,.24*s,.47*s,leaves[2]);
  }
  for(const x of [-24,24])for(const z of [-21,-7,7,21])tree(x,z,1.05+rand()*.42,z<0&&x>0);
  tree(6.7,-18,1.15,true);tree(-6.3,20,1.18);tree(19,23,1.16);
  function stall(x:number,z:number){
    solid(x,z,3.5,2.4);
    for(const dx of [-1.6,1.6])for(const dz of [-1,1])brick(x+dx,1.38,z+dz,.13,2.7,.13,'#91755b');
    for(let i=0;i<8;i++)brick(x-1.69+i*.48,2.83,z,.49,.24,2.65,i%2?mango:cream);
    brick(x,.58,z,3.45,.99,1.67,'#866753');
    for(let col=0;col<5;col++)for(let row=0;row<3;row++)
      brick(x-1.37+col*.66,1.17,z-.57+row*.56,.59,.24,.49,['#eea938','#ee7843','#d96f86','#f4d56c','#c83458'][col]);
  }
  stall(-21,15);stall(22,-14);board(-21,2.02,16.05,3,.61,1,'FLOWER MARKET','KR MARKET',ink);
  function auto(x:number,z:number){
    solid(x,z,1.68,2.72);
    for(const dx of [-.68,.68])brick(x+dx,.34,z-.7,.31,.64,.64,ink);
    brick(x,.32,z+.91,.36,.64,.62,ink);brick(x,.7,z,1.57,.62,2.38,'#258366');brick(x,.94,z+1.07,1.38,.47,.38,'#388d68');
    brick(x,1.2,z-.91,1.48,.62,.27,mango);
    for(const dx of [-.7,.7])for(const dz of [-.82,.72])brick(x+dx,1.49,z+dz,.12,1.05,.13,ink);
    brick(x,1.94,z,1.73,.31,2.17,'#edb746');brick(x,1.36,z+.76,1.26,.52,.08,'#6eaca7');
    brick(x,.9,z+1.3,.52,.2,.08,cream,true);brick(x,1.04,z-.5,1.2,.25,.61,ink);
  }
  auto(3,-13);auto(-3,17);auto(19,3);
  for(const x of [-5.7,5.7])for(const z of [-7.6,8.1,22.2]){
    brick(x,1.9,z,.16,3.8,.17,ink);brick(x+Math.sign(-x)*.44,3.77,z,1.04,.14,.18,ink);
    brick(x+Math.sign(-x)*.85,3.64,z,.53,.21,.48,'#ffdd98',true);solid(x,z,.31,.31);
  }
  for(const x of [-5.8,5.8]){
    brick(x,1.34,0,.12,2.68,.14,ink);brick(x,2.72,0,.6,1,.38,ink);
    for(let k=0;k<3;k++)brick(x,2.98-k*.28,.21,.16,.16,.04,[coral,mango,'#81d395'][k],true);
  }

  // Namma Metro's purple stripe follows the viaduct across the northern horizon.
  for(let x=-46;x<=46;x+=10){
    brick(x,2.9,-26,.95,5.8,1.4,'#9da69d');brick(x,5.76,-26,1.4,.6,2.75,'#b0b6a7');
    if(Math.abs(x)<31)solid(x,-26,1.02,1.5);
  }
  brick(0,6.22,-26,104,.63,3.4,'#9da7a6');
  for(const rail of [-1,1]){
    brick(0,6.62,-26+rail*1.56,104,.36,.18,'#bdc2b5');brick(0,6.65,-26+rail*.78,104,.12,.12,ink);
  }
  const train=new THREE.Group(),cars:Brick[]=[];
  for(let car=0;car<3;car++){
    const at=car*6.12;
    cars.push([at,0,0,5.85,1.46,2.12,'#e2dfc9'],[at,.85,0,5.7,.27,2.01,'#bdc8be']);
    for(const s of [-1,1]){
      cars.push([at,-.3,s*1.07,5.82,.32,.07,'#985e99']);
      for(let win=0;win<6;win++)cars.push([at-2.3+win*.9,.25,s*1.07,.66,.43,.09,'#324d62']);
    }
  }
  instance(train,cars,matte);train.position.set(-40,7.5,-26);scene.add(train);
  instance(scene,bricks,matte);instance(scene,lamps,lit);
  let previousNight:boolean|undefined;
  function animate(seconds:number,night:boolean){
    train.position.x=(seconds*3.4+39)%118-66;
    if(night!==previousNight){lit.emissiveIntensity=night?.6:.02;previousNight=night}
  }
  return {solids,lights:[lit] as THREE.Material[],animate};
}

