import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import CircularCarousel from './react-bits/CircularCarousel.jsx';
import Aurora from './react-bits/Aurora.jsx';

function useReducedMotion() {
  const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(q.matches);q.addEventListener('change',change);return()=>q.removeEventListener('change',change)},[]);
  return reduced;
}
function useNarrow() {
  const [narrow,setNarrow]=useState(()=>matchMedia('(max-width: 680px)').matches);
  useEffect(()=>{const q=matchMedia('(max-width: 680px)');const change=()=>setNarrow(q.matches);q.addEventListener('change',change);return()=>q.removeEventListener('change',change)},[]);
  return narrow;
}
const fallback=document.querySelector('[data-news-track]');
const extraImages=['assets/media/club-equipment.jpg','assets/media/training-simulators.jpg'];
const cinemaStory='FPV-дрон изменил язык съёмки: он проходит через узкие пространства, следует за героем и строит динамичные траектории там, где раньше требовались кран или вертолёт. Компактная камера оказывается буквально внутри действия, но выразительный кадр зависит не только от техники. Пилоту нужно заранее видеть маршрут, держать скорость и работать как соавтор режиссёра. Именно поэтому навыки из дрон-рейсинга — точность, реакция и чувство пространства — напрямую переходят в профессиональную съёмку.';
const items=[...fallback.children].map((card,index)=>{
  const button=card.querySelector('.news-open');
  const video=card.querySelector('video');
  return {
    src:card.querySelector('img')?.getAttribute('src') || video?.getAttribute('poster') || extraImages[index-4],
    alt:card.querySelector('img')?.getAttribute('alt') || card.querySelector('h3').textContent.trim(),
    title:button?.dataset.newsTitle || card.querySelector('h3').textContent.trim(),
    subtitle:button?.dataset.newsDate || 'Видео · кино',
    body:button?.dataset.newsBody || cinemaStory,
    video:video?.getAttribute('src')
  };
});
function openStory(item,trigger) {
  const dialog=document.querySelector('[data-news-reader]');
  const content=dialog.querySelector('.dialog-content');
  if(!content.querySelector('.story-layout')) {
    const layout=document.createElement('div');layout.className='story-layout';
    const visual=document.createElement('div');visual.className='story-visual';
    const copy=document.createElement('div');copy.className='story-copy';
    [...content.children].forEach(el=>copy.append(el));
    layout.append(visual,copy);content.append(layout);
  }
  dialog.querySelector('[data-news-reader-title]').textContent=item.title;
  dialog.querySelector('[data-news-reader-date]').textContent=item.subtitle;
  dialog.querySelector('[data-news-reader-body]').textContent=item.body;
  dialog.querySelector('.story-media')?.remove();
  const media=document.createElement(item.video?'video':'img');
  media.className='story-media';
  media.src=item.video||item.src;
  if(item.video){media.controls=true;media.playsInline=true;media.preload='metadata';media.poster=item.src;}
  else {media.alt=item.alt;media.loading='lazy';}
  dialog.querySelector('.story-visual').append(media);
  window.goodwinDialogs.open(dialog,trigger);
}
function NewsExperience() {
  const [active,setActive]=useState(0);
  const reduced=useReducedMotion();
  const narrow=useNarrow();
  const [playing,setPlaying]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);
  const api=useRef(null);
  const host=useRef(null);
  const rail=useRef(null);
  const current=items[active];
  useEffect(()=>{
    document.querySelector('[data-news-carousel]').classList.add('is-enhanced');
    fallback.closest('.news-viewport').inert=true;
    return()=>{document.querySelector('[data-news-carousel]')?.classList.remove('is-enhanced');fallback.closest('.news-viewport').inert=false;};
  },[]);
  useEffect(()=>{
    if(reduced){setPlaying(false);return;}
    const visibility=()=>setPlaying(!document.hidden);
    document.addEventListener('visibilitychange',visibility);
    return()=>document.removeEventListener('visibilitychange',visibility);
  },[reduced]);
  useEffect(()=>{
    if(!narrow||reduced||!playing)return;
    const timer=setInterval(()=>goTo((active+1)%items.length,false),7000);
    return()=>clearInterval(timer);
  },[active,narrow,reduced,playing]);
  const select=(item,index)=>{if(index===active)openStory(item,host.current.querySelector('.story-open'));};
  const goTo=index=>{if(reduced||narrow){setActive(index);const track=rail.current;const card=track?.children[index];if(card)track.scrollTo({left:card.offsetLeft-track.offsetLeft-(track.clientWidth-card.offsetWidth)/2,behavior:reduced?'instant':'smooth'});}else api.current?.goTo(index);};
  return <div className={'news-orbit'+(reduced?' is-reduced':'')} ref={host}>
    {reduced?<div className="news-static-strip">{items.map((item,index)=><button key={index} className={'news-static-item'+(active===index?' is-active':'')} onClick={()=>setActive(index)} aria-pressed={active===index}><img src={item.src} alt=""/><span>{item.title}</span></button>)}</div>:
    narrow?<div className="news-mobile-gallery" ref={rail} onScroll={e=>{const el=e.currentTarget;const index=Math.round(el.scrollLeft/(el.children[0]?.offsetWidth+16));setActive(Math.min(items.length-1,Math.max(0,index)))}}>{items.map((item,index)=><button key={index} aria-label={item.title} onClick={e=>openStory(item,e.currentTarget)}><img src={item.src} alt={item.alt}/><span>{item.subtitle}</span></button>)}</div>:
    <div className="news-orbit-stage"><CircularCarousel items={items} apiRef={api} preset="orbit" intro="rise" cardWidth={360} aspectRatio={.9} gap={38} tilt={-8} perspective={1800} curve={0} autoplay={playing?'drift':'off'} speed={4.5} momentum={.35} parallax={.06} stretch={0} depthFade={.76} innerShade={.75} cornerRadius={14} fadeColor="#edf6fb" pauseOnHover={false} onChange={setActive} onItemClick={select}/></div>}
    <div className="orbit-navigation" aria-label="Управление каруселью">
      <div className="orbit-arrows">
        <button className="orbit-control" aria-label="Предыдущий материал" onClick={()=>goTo((active+items.length-1)%items.length)}>Назад</button>

        <button className="orbit-control" aria-label="Следующий материал" onClick={()=>goTo((active+1)%items.length)}>Далее</button>
      </div>
    </div>
    <div className="orbit-story" aria-live="polite" aria-atomic="true">
      <div className="orbit-story-main"><p className="orbit-topic">{current.subtitle}</p><h3>{current.title}</h3></div>
      <div className="orbit-story-copy"><p>{current.body}</p><button className="story-open" onClick={e=>openStory(current,e.currentTarget)}>{current.video?'Смотреть видео':'Читать материал'}</button></div>
    </div>
    
  </div>;
}

const instructors=[...document.querySelectorAll('[data-team-card]')].map(card=>({
  name:card.dataset.teamName,role:card.dataset.teamRole,bio:card.dataset.teamBio,
  image:card.dataset.teamImage,focal:card.dataset.teamFocal,
  specialties:[...card.querySelectorAll('.team-specialties span')].map(e=>e.textContent)
}));
function InstructorExperience() {
  const [active,setActive]=useState(0);const reduced=useReducedMotion();const image=useRef(null);
  const selected=instructors[active];
  useEffect(()=>{const team=document.getElementById('team');team.classList.add('is-enhanced');team.querySelector('.team-list').inert=true;return()=>{team.classList.remove('is-enhanced');team.querySelector('.team-list').inert=false}},[]);
  useEffect(()=>{if(!reduced)image.current?.animate([{opacity:.3,transform:'scale(1.015)'},{opacity:1,transform:'none'}],{duration:320,easing:'ease-out'})},[active,reduced]);
  const open=e=>{
    const dialog=document.querySelector('[data-team-overlay]');
    dialog.querySelector('[data-team-detail-name]').textContent=selected.name;
    dialog.querySelector('[data-team-detail-role]').textContent=selected.role;
    dialog.querySelector('[data-team-detail-bio]').textContent=selected.bio;
    const img=dialog.querySelector('[data-team-detail-image]');img.src=selected.image;img.alt=selected.name;img.style.objectPosition=selected.focal;
    window.goodwinDialogs.open(dialog,e.currentTarget);
  };
  return <div className="crew-experience">
    <div className="crew-stage">
      <div className="crew-portrait"><img ref={image} src={selected.image} alt={selected.name} style={{objectPosition:selected.focal}}/></div>
      <div className="crew-copy"><p className="crew-role">{selected.role}</p><h3 aria-live="polite">{selected.name}</h3><p className="crew-bio">{selected.bio}</p><div className="crew-actions"><button className="crew-profile-button" aria-haspopup="dialog" aria-controls="team-dialog" onClick={open}>Об инструкторе</button><a href="#callback">Записаться на занятие</a></div></div>
    </div>
    <div className="crew-roster" aria-label="Выбрать инструктора">{instructors.map((person,index)=><button key={person.name} aria-pressed={index===active} onClick={()=>setActive(index)}><img src={person.image} alt="" style={{objectPosition:person.focal}}/><span><strong>{person.name}</strong><small>{person.role}</small></span></button>)}</div>
  </div>;
}

const newsRoot=document.getElementById('news-experience');
if(newsRoot)createRoot(newsRoot).render(<NewsExperience/>);
const teamRoot=document.createElement('div');teamRoot.id='team-experience';document.querySelector('.team-list').before(teamRoot);createRoot(teamRoot).render(<InstructorExperience/>);

function SiteAtmosphere(){
  const reduced=useReducedMotion(),narrow=useNarrow();
  const [paused,setPaused]=useState(false);
  useEffect(()=>{const watch=new MutationObserver(()=>setPaused(document.body.classList.contains('has-open-dialog')));watch.observe(document.body,{attributes:true,attributeFilter:['class']});return()=>watch.disconnect();},[]);
  if(reduced||narrow)return null;
  return <Aurora colorStops={['#438eb9','#21a9e9','#c6eafa']} amplitude={1.1} blend={.45} speed={.42} height={.62} scale={.8} glow={.35} brightness={1} layers={2} intro={false} opacity={.7} dpr={1} paused={paused} mouseInteraction/>;
}
const ambientRoot=document.createElement('div');ambientRoot.id='site-atmosphere';ambientRoot.setAttribute('aria-hidden','true');document.body.prepend(ambientRoot);createRoot(ambientRoot).render(<SiteAtmosphere/>);
