import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n');
const html=read('index.html'),protectedSource=JSON.parse(read('content/protected-source.json'));
for(const [id,marker] of [['team','<section class="team-section section"'],['schedule','<section class="schedule-section section"']]){
 const start=html.indexOf(marker),end=html.indexOf('</section>',start)+10;
 if(start<0||html.slice(start,end)!==protectedSource[id])throw Error(`Protected ${id} section changed`);
}
const phones=[...html.matchAll(/href="tel:([^"]+)"/g)].map(match=>match[1]);
if(phones.length!==4||phones.some(value=>value!=='+79080116174'))throw Error('Protected phone changed');
const stories=JSON.parse(read('content/stories.json'));
if(stories.length!==6||stories.filter(item=>item.kind==='article').length!==4)throw Error('Expected four articles and two photo notes');
for(const story of stories){
 if(!story.title||!story.lead||!story.alt||!story.source||!story.review||!story.sections.length)throw Error('Incomplete story: '+story.id);
 if(!fs.existsSync(path.join(root,story.src)))throw Error('Missing image: '+story.src);
 if(story.video&&!fs.existsSync(path.join(root,story.video)))throw Error('Missing video: '+story.video);
}
if((html.match(/<h1>/g)||[]).length!==1)throw Error('Expected exactly one H1');
if(!html.includes('Форма пока не отправляет заявки.'))throw Error('Demo form disclosure missing');
if(read('script.js').includes('Спасибо, ждите звонка'))throw Error('False submission message remains');
console.log('Protected copy/phone, six complete stories, media, H1 and honest form state verified.');
