// Recording-only annotations; no application files or behavior are changed.
const fs = require('node:fs');
const path = require('node:path');
class TutorialRecorder {
  constructor(work, scenes) { this.work = work; this.scenes = scenes; this.targets = []; this.key = ''; this.status = ''; this.cursor = null; }
  highlight(...targets) { this.targets = targets; }
  async annotate(page) {
    const boxes = [];
    for (const target of this.targets) {
      const box = await target.boundingBox().catch(() => null);
      if (box) boxes.push(box);
    }
    await page.evaluate(({ boxes, key, status, cursor }) => {
      let layer = document.getElementById('__tutorial_annotations');
      if (!layer) { layer = document.createElement('div'); layer.id = '__tutorial_annotations'; layer.setAttribute('popover','manual'); layer.style.cssText = 'position:fixed;inset:0;margin:0;padding:0;border:0;width:100vw;height:100vh;background:transparent;overflow:visible;z-index:2147483647;pointer-events:none'; document.documentElement.append(layer); }
      if (layer.matches(':popover-open')) layer.hidePopover();
      layer.showPopover();
      layer.replaceChildren();
      for (const b of boxes) {
        const ring = document.createElement('div');
        ring.style.cssText = `position:absolute;left:${Math.max(2,b.x-5)}px;top:${Math.max(2,b.y-5)}px;width:${b.width+10}px;height:${b.height+10}px;border:3px solid #ffbe26;border-radius:${b.width<60?'50%':'14px'};box-shadow:0 0 0 2px #85052d,0 0 0 4px #fff9;box-sizing:border-box`;
        layer.append(ring);
      }
      if (key || status) {
        const badge = document.createElement('div');
        badge.textContent = [key, status].filter(Boolean).join('　｜　');
        badge.style.cssText = 'position:absolute;right:90px;top:32px;max-width:750px;padding:10px 18px;border-radius:10px;background:#720022;color:#fff;font:600 18px system-ui;box-shadow:0 2px 8px #0003';
        layer.append(badge);
      }
      if (cursor) { const dot=document.createElement('div');dot.style.cssText=`position:absolute;left:${cursor.x-9}px;top:${cursor.y-9}px;width:18px;height:18px;border:3px solid white;border-radius:50%;background:#ed1651;box-shadow:0 0 0 2px #720022`;layer.append(dot); }
    }, { boxes, key: this.key, status: this.status, cursor: this.cursor });
  }
  async record(id, target, action, liveStatus) {
    const scene = this.scenes.find(s => s.id === id);
    if (!scene) throw Error(`Unknown scene ${id}`);
    const dir = path.join(this.work, id); fs.mkdirSync(dir,{recursive:true});
    const count = Math.ceil(scene.duration * 6);
    const page = typeof target.page === 'function' ? target.page() : target;
    for (let i=0;i<count;i++) {
      const start=Date.now();
      if (action) await action(i,count);
      if (liveStatus) this.status=await liveStatus();
      if (scene.kind!=='player') await this.annotate(page);
      await target.screenshot({path:path.join(dir,`${String(i).padStart(5,'0')}.jpg`),type:'jpeg',quality:92,...(scene.kind==='player'?{}:{scale:'css'})});
      await new Promise(r=>setTimeout(r,Math.max(0,167-(Date.now()-start))));
    }
    console.log(`Recorded ${id} (${count} frames)`);
  }
  async clear(page) { await page.evaluate(()=>document.getElementById('__tutorial_annotations')?.remove()).catch(()=>{}); this.targets=[];this.key='';this.status='';this.cursor=null; }
}
module.exports={TutorialRecorder};
