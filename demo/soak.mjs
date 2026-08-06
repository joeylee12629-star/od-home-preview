import { chromium } from '/Users/joey/.npm-global/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
await p.goto('http://localhost:3987/', { waitUntil:'domcontentloaded' }).catch(()=>{});
await p.waitForTimeout(4000);
// 模拟用户连续滚轮浏览全页(鼠标停在页面中央,会路过 demo 区)
let stuck=0, last=-1;
for(let i=0;i<60;i++){
  await p.mouse.move(720, 450);
  await p.mouse.wheel(0, 600);
  await p.waitForTimeout(120);
  const y=await p.evaluate(()=>window.scrollY);
  if(y===last) stuck++; else stuck=0;
  last=y;
  if(stuck>5){ console.log('STUCK at', y, 'iter', i); break; }
}
console.log('final scrollY:', last, 'maxStuckStreak<=5:', stuck<=5);
// 再滚回顶部
for(let i=0;i<30;i++){ await p.mouse.wheel(0,-1500); await p.waitForTimeout(60); }
console.log('back to top:', await p.evaluate(()=>window.scrollY));
await b.close();
