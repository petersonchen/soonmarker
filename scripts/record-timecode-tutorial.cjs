// Record the keyboard workflow against the real extension, after the main tutorial.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const {TutorialRecorder}=require('./tutorial-recorder.cjs');
const work=path.resolve(__dirname,'../dist/timecode-work');
const scenes=JSON.parse(fs.readFileSync(path.join(work,'timing.json')));
(async()=>{
 const b=await chromium.connectOverCDP(process.env.CDP_ENDPOINT||'http://127.0.0.1:9333');const c=b.contexts()[0];
 const m=c.pages().filter(p=>p.url().includes('/manage/manage.html')).at(-1);const v=c.pages().find(p=>p.url().includes('aqz-KE-bpKQ'));
 if(!m||!v)throw Error('Run the main tutorial in the dedicated recording profile first.');
 const previousPlayer = await m.evaluate(async()=>{const old=await chrome.storage.session.get('playerTabId');const tabs=await chrome.tabs.query({url:'https://www.youtube.com/watch?v=aqz-KE-bpKQ*'});if(!tabs.length)throw Error('Demo playback tab missing');await chrome.storage.session.set({playerTabId:tabs[0].id});return old;});
 await v.bringToFront();await v.evaluate(()=>{const p=document.querySelector('#movie_player');p.setPlaybackQualityRange?.('medium');p.seekTo(45,true);p.playVideo();document.querySelector('video').muted=true;});await v.waitForFunction(()=>{const v=document.querySelector('video');return v.readyState>=3&&v.currentTime>45.3});await v.evaluate(()=>document.querySelector('#movie_player').pauseVideo());
 await m.bringToFront();await m.setViewportSize({width:1280,height:640});await m.locator('#search').fill('教學示範');await m.locator('[data-mode="edit"]').click();await m.evaluate(()=>window.scrollTo(0,0));
 const field=m.locator('.video[data-video-key="youtube:aqz-KE-bpKQ"] .marker-time').first();if(await field.inputValue()==='00:00:44'){await field.fill('00:00:45');await field.press('Enter');}assert.equal(await field.inputValue(),'00:00:45');
 const rec=new TutorialRecorder(work,scenes);const results=[];
 rec.highlight(m.locator('[data-mode="edit"]'));await rec.record('focus',m,async(i,n)=>{if(i===Math.floor(n*.4)){await field.click();rec.highlight(field);rec.key='點選 timecode';}});
 rec.key='';await rec.record('up',m,async(i,n)=>{if(i===Math.floor(n*.25)||i===Math.floor(n*.57)){await field.press('ArrowUp');rec.key='↑　+1 秒';}});assert.equal(await field.inputValue(),'00:00:47');results.push({keys:'ArrowUp ×2',value:await field.inputValue()});
 rec.key='';await rec.record('down',m,async(i,n)=>{if([.2,.4,.6].some(t=>i===Math.floor(n*t))){await field.press('ArrowDown');rec.key='↓　−1 秒';}});assert.equal(await field.inputValue(),'00:00:44');results.push({keys:'ArrowDown ×3',value:await field.inputValue()});
 const live=async()=>{const state=await v.evaluate(()=>{const v=document.querySelector('video');return {paused:v.paused,time:v.currentTime}});return `背景影片 ${state.paused?'暫停':'播放中'}　00:${String(Math.floor(state.time/60)).padStart(2,'0')}:${String(Math.floor(state.time)%60).padStart(2,'0')}`;};
 const verify=async(expected)=>{
   await v.waitForFunction(t=>{const v=document.querySelector('video');return !v.paused&&v.currentTime>=t-.5&&v.currentTime<t+5},expected);
   const state=await m.evaluate(async()=>{const all=await chrome.storage.local.get(null);const marker=all['markers:youtube:aqz-KE-bpKQ'].find(x=>!x.deletedAt&&x.note==='教學示範：回看角色動作');return {stored:marker.time,activeTab:(await chrome.tabs.getCurrent()).active,focused:document.activeElement.classList.contains('marker-time')};});
   assert.equal(state.stored,expected);assert.equal(state.activeTab,true);assert.equal(state.focused,true);results.push({keys:'Shift+Enter',...state});
 };
 rec.key='';await rec.record('preview',m,async(i,n)=>{if(i===Math.floor(n*.35)){rec.key='Shift + Enter';await field.press('Shift+Enter');await verify(44);}},live);
 rec.key='';await rec.record('repeat',m,async(i,n)=>{if(i===Math.floor(n*.25)){await field.press('ArrowDown');rec.key='↓　−1 秒';assert.equal(await field.inputValue(),'00:00:43');}if(i===Math.floor(n*.55)){rec.key='Shift + Enter';await field.press('Shift+Enter');await verify(43);}},live);
 await v.evaluate(()=>document.querySelector('#movie_player').pauseVideo());await rec.clear(m);await m.reload();await m.locator('#search').fill('教學示範');await m.waitForSelector('.marker-time');assert.equal(await field.inputValue(),'00:00:43');rec.highlight(field);rec.key='重新載入後仍為 00:00:43';await rec.record('saved',m);await rec.clear(m);
 fs.writeFileSync(path.join(work,'verification.json'),JSON.stringify({results,reloaded:await field.inputValue()},null,2));await field.fill('00:00:45');await field.press('Enter');await m.locator('#search').fill('');await m.evaluate(async old=>{if(old.playerTabId===undefined)await chrome.storage.session.remove('playerTabId');else await chrome.storage.session.set(old);},previousPlayer);await(await c.newCDPSession(m)).send('Emulation.clearDeviceMetricsOverride');await b.close();console.log('Timecode tutorial complete: values, persistent storage, active manage tab and input focus verified.');
})().catch(e=>{console.error(e);process.exit(1)});
