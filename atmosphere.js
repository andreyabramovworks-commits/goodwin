/* Event-driven background parallax; content never moves with the pointer. */
(() => {
  const query=matchMedia('(prefers-reduced-motion: reduce), (max-width: 680px)');
  const sections=[...document.querySelectorAll('main > section')];
  const active=new Set();
  const values=new Map(sections.map(el=>[el,{x:0,y:0}]));
  let pointerX=0,pointerY=0,frame=0;
  function draw(){
    frame=0;
    if(query.matches||document.hidden)return;
    let moving=false;
    active.forEach(el=>{
      const box=el.getBoundingClientRect();
      const depth=Math.max(-1,Math.min(1,(innerHeight/2-box.top-box.height/2)/innerHeight));
      const tx=pointerX*24,ty=pointerY*16+depth*34;
      const state=values.get(el);
      state.x+=(tx-state.x)*.075;state.y+=(ty-state.y)*.075;
      el.style.setProperty('--scene-x',state.x.toFixed(2)+'px');
      el.style.setProperty('--scene-y',state.y.toFixed(2)+'px');
      if(Math.abs(tx-state.x)+Math.abs(ty-state.y)>.15)moving=true;
    });
    if(moving)frame=requestAnimationFrame(draw);
  }
  function schedule(){if(!frame&&!query.matches&&!document.hidden)frame=requestAnimationFrame(draw);}
  const observer=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>isIntersecting?active.add(target):active.delete(target));schedule();});
  sections.forEach(el=>observer.observe(el));
  addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;pointerX=e.clientX/innerWidth-.5;pointerY=e.clientY/innerHeight-.5;schedule();},{passive:true});
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
  query.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;if(query.matches)sections.forEach(el=>{el.style.removeProperty('--scene-x');el.style.removeProperty('--scene-y');});else schedule();});
})();
