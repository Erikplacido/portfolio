/* Atlas de personagens originais. Animações em segundos, independentes do FPS. */
(function () {
  'use strict';
  const C = window.Characters = {};
  const loaded = {};
  let menuBody=null,menuWings=null;
  const path = p => (window.EMBED && window.EMBED[p]) || p;
  C.load = () => Promise.all(['fly','enemies','props'].map(name => new Promise((resolve,reject) => {
    const image = new Image();
    image.onload = () => { loaded[name] = image; resolve(); };
    image.onerror = () => reject(new Error('Não foi possível carregar os personagens.'));
    image.src = path('assets/characters/'+name+'.png');
  }))).then(prepareMenuFlight);
  function prepareMenuFlight() {
    // Keep the exact same body pixels throughout the menu loop. The generated
    // full-body frames have different contours, so only the wings move here.
    menuBody=document.createElement('canvas');menuBody.width=menuBody.height=48;
    menuWings=document.createElement('canvas');menuWings.width=menuWings.height=48;
    const body=menuBody.getContext('2d'),wings=menuWings.getContext('2d');
    body.imageSmoothingEnabled=wings.imageSmoothingEnabled=false;
    body.drawImage(loaded.fly,0,0,48,48,0,0,48,48);
    body.clearRect(0,0,29,17);body.clearRect(0,17,25,12);
    // Retain the wing root on the body, so the flutter stays attached.
    wings.drawImage(loaded.fly,0,0,29,17,0,0,29,17);
    wings.drawImage(loaded.fly,0,17,25,14,0,17,25,14);
  }
  C.menuFly=(ctx,x,y,time,animate=true)=>{
    if(!menuBody)return;
    const scale=2,left=Math.round(x)-35*scale,top=Math.round(y)-32*scale;
    const lift=animate?[0,-1,-2,-1,0,1][Math.floor(Math.max(0,time)*18)%6]:0;
    ctx.save();ctx.imageSmoothingEnabled=false;
    ctx.drawImage(menuWings,left,top+lift*scale,96,96);
    ctx.drawImage(menuBody,left,top,96,96);
    ctx.restore();
  };
  const loop = (time, fps, frames) => frames[Math.floor(Math.max(0,time)*fps)%frames.length];
  C.flyFrame = (state,time) => {
    if(state==='sleep') return 14;
    if(state==='hurt') return 13;
    if(state==='scared') return 12;
    if(state==='wink') return 15;
    if(state==='eat'||state==='joy') return loop(time,10,[8,9,10,11]);
    if(state==='dash') return loop(time,18,[4,5,6,7]);
    return loop(time,14,[0,1,2,3]);
  };
  function frame(ctx, image, cell, id, x,y,w,h,flip,alpha=1) {
    if(!image) return;
    ctx.save();ctx.globalAlpha*=alpha;
    x=Math.round(x);y=Math.round(y);
    if(flip){ctx.translate(x+w,y);ctx.scale(-1,1);x=0;y=0;}
    ctx.drawImage(image,(id%4)*cell,Math.floor(id/4)*cell,cell,cell,x,y,w,h);
    ctx.restore();
  }
  C.fly = (ctx,x,y,state,time,alpha=1) => frame(ctx,loaded.fly,48,C.flyFrame(state,time),x-35,y-32,48,48,false,alpha);
  C.enemyFrame = (type,state,time) => {
    if(type==='frog') return state==='strike'?2:state==='warn'?1:state==='recover'?3:loop(time,2,[0,0,0,3]);
    const base=type==='baby'?8:4;
    return base+(state==='strike'?3:state==='warn'?2:loop(time,type==='baby'?7:4,[0,1,0,2]));
  };
  C.enemy = (ctx,type,state,time,x,y,w,h,alpha=1,flip=false) => frame(ctx,loaded.enemies,64,C.enemyFrame(type,state,time),x,y,w,h,flip,alpha);
  const props={leaf:[0,16,48,24],swatter:[0,40,72,32],paper:[80,16,24,64]};
  C.prop=(ctx,name,x,y,w,h,flipY=false)=>{
    if(!loaded.props)return;
    const a=props[name];ctx.save();
    if(flipY){ctx.translate(Math.round(x),Math.round(y+h));ctx.scale(1,-1);x=y=0;}
    ctx.drawImage(loaded.props,...a,Math.round(x),Math.round(y),Math.round(w),Math.round(h));ctx.restore();
  };
  C.foodCanvases=()=>[4,0,1,2,3].map(id=>{
    const c=document.createElement('canvas');c.width=c.height=16;
    c.getContext('2d').drawImage(loaded.props,id*16,0,16,16,0,0,16,16);return c;
  });
  C.previewURL = state => {
    if(!loaded.fly) return '';
    const canvas=document.createElement('canvas');canvas.width=canvas.height=48;
    const ctx=canvas.getContext('2d');frame(ctx,loaded.fly,48,C.flyFrame(state,0),0,0,48,48,false);
    return canvas.toDataURL();
  };
})();
