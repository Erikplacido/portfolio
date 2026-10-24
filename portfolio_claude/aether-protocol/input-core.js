/* Pure input and timing helpers, shared by the runtime and verification. */
(function(root){
  const api = {
    platform(id){ return /sony|playstation|dualsense|dualshock|054c/i.test(id) ? 'ps' : 'xbox'; },
    sector(x,y){ if(Math.hypot(x,y)<0.35)return null; return Math.floor((((Math.atan2(x,-y)*180/Math.PI)+390)%360)/60); },
    pressed(buttons,previous,index){ return !!buttons[index]?.pressed && !previous[index]; },
    advance(delta,scale,target,time){const dt=Math.min(Math.max(delta,0),0.05); const next=scale+(target-scale)*(1-Math.exp(-12*dt)); return {scale:next,dt:dt*next,time:time+dt*next};}
  };
  if(typeof module !== 'undefined')module.exports=api;
  else root.MarshalInput=api;
})(typeof window !== 'undefined'?window:this);
