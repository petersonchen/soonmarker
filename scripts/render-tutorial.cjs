// Compose recorded UI frames with Chinese captions and local TTS narration.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const name = process.env.TUTORIAL || 'main';
const work = path.join(root, 'dist', name === 'main' ? 'tutorial-work-v2' : 'timecode-work');
const outputBase = name === 'main' ? 'soonmarker-tutorial-zh-TW' : 'soonmarker-timecode-zh-TW';
const scenes = JSON.parse(fs.readFileSync(path.join(work, 'timing.json')));
const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const time = seconds => { const ms = Math.round(seconds * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2,'0')}:${String(Math.floor(ms / 60000) % 60).padStart(2,'0')}:${String(Math.floor(ms / 1000) % 60).padStart(2,'0')},${String(ms % 1000).padStart(3,'0')}`; };
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  const icon = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(root, 'icons/icon.svg')).toString('base64');
  let elapsed = 0; const subs = []; const chapters = [];
  for (const [index, scene] of scenes.entries()) {
    let center = '';
    if (scene.kind === 'popup') center = `<aside><small>影片分頁 → 工具列 soonmarker</small><h1>${esc(scene.title.slice(4))}</h1><p>${esc(scene.caption)}</p><div class="chip">真正的擴充功能視窗</div></aside>`;
    if (scene.id === 'intro') center = `<div class="card"><img src="${icon}"><h1>${esc(scene.hero || '看影片時，記下重點。')}</h1><p>${esc(scene.summary || '建立時間標記 → CUE／PLAY 回看 → Episode 整理')}</p><div class="chip">繁體中文操作教學 · soonmarker v0.3.0</div></div>`;
    if (scene.id === 'outro') center = `<div class="card"><h1>${esc(scene.hero || '看到重點，就把時間記下來。')}</h1><p>${esc(scene.summary || 'Windows／Linux：Alt + Shift + M　macOS：Option + Shift + M')}</p><div class="credits">示範影片：Big Buck Bunny © Blender Foundation<br>www.bigbuckbunny.org · CC BY 3.0 · creativecommons.org/licenses/by/3.0/<br>本教學擷取播放畫面，僅保留電腦旁白，未使用原片音軌。<br>soonmarker 與 Blender Foundation 無隸屬或背書關係。</div></div>`;
    const html = `<html lang="zh-Hant"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:1280px;height:800px;background:#f6f4f5;font-family:system-ui,-apple-system,sans-serif;color:#35252d}header{height:80px;background:#720022;color:white;display:flex;align-items:center;gap:16px;padding:0 32px;font-size:24px;font-weight:700}header img{width:36px;height:36px}header span{margin-left:auto;font-size:15px;font-weight:400;color:#f0d8e0}footer{position:absolute;left:0;bottom:0;width:1280px;height:80px;background:#27141c;color:white;display:flex;align-items:center;justify-content:center;text-align:center;padding:10px 42px;font-size:23px;line-height:1.45}aside{position:absolute;left:56px;top:175px;width:535px}small{font-size:18px;color:#805065}h1{font-size:44px;line-height:1.3;letter-spacing:-1px;margin:22px 0}p{font-size:26px;line-height:1.7}.chip{display:inline-block;background:#efdce3;color:#720022;border-radius:9px;padding:12px 18px;font-size:18px;margin-top:20px}.card{position:absolute;top:135px;left:80px;width:1120px;text-align:center}.card>img{width:120px;height:120px}.card h1{font-size:48px}.card p{font-size:26px}.credits{font-size:17px;line-height:1.8;color:#715360;margin-top:48px}</style><header><img src="${icon}">${esc(scene.title)}<span>soonmarker · ${index + 1} / ${scenes.length}</span></header>${center}<footer>${esc(scene.caption)}</footer></html>`;
    await page.setContent(html); await page.evaluate(() => document.fonts.ready);
    const bg = path.join(work, `${scene.id}-background.png`);
    await page.screenshot({ path: bg });
    const output = path.join(work, `${scene.id}.mp4`);
    const duration = scene.duration.toFixed(2);
    let args = ['-y', '-hide_banner', '-loglevel', 'error', '-loop', '1', '-framerate', '30', '-i', bg];
    if (scene.kind === 'card') {
      args.push('-i', path.join(work, `${scene.id}.aiff`), '-map', '0:v', '-map', '1:a', '-af', 'apad');
    } else {
      args.push('-framerate', '6', '-i', path.join(work, scene.id, '%05d.jpg'), '-i', path.join(work, `${scene.id}.aiff`));
      const filter = scene.kind === 'popup' ? '[1:v]scale=434:600:force_original_aspect_ratio=decrease:force_divisible_by=2,pad=436:600:(ow-iw)/2:0:color=0xf6f4f5[v];[0:v][v]overlay=710:100:shortest=1[out]' : scene.kind === 'manage' ? '[0:v][1:v]overlay=0:80:shortest=1[out]' : '[1:v]scale=1138:640:force_original_aspect_ratio=decrease,pad=1138:640:(ow-iw)/2:(oh-ih)/2:color=0xf6f4f5[v];[0:v][v]overlay=71:80:shortest=1[out]';
      args.push('-filter_complex', filter, '-map', '[out]', '-map', '2:a', '-af', 'apad');
    }
    args.push('-t', duration, '-r', '30', '-c:v', 'libx264', '-preset', 'fast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-ar', '48000', '-movflags', '+faststart', output);
    if (!process.env.RENDER_SCENES || process.env.RENDER_SCENES.split(',').includes(scene.id)) {
      execFileSync('ffmpeg', args, { stdio: 'inherit' });
    }
    subs.push(`${index + 1}\n${time(elapsed)} --> ${time(elapsed + scene.duration)}\n${scene.caption}\n`);
    chapters.push({ start: Number(elapsed.toFixed(2)), title: scene.title, duration: scene.duration });
    elapsed += scene.duration;
    console.log(`Rendered ${scene.id}`);
  }
  await browser.close();
  const concat = path.join(work, 'concat.txt');
  fs.writeFileSync(concat, scenes.map(s => `file '${s.id}.mp4'`).join('\n'));
  const srt = path.join(root, `dist/${outputBase}.srt`); fs.writeFileSync(srt, subs.join('\n'));
  fs.writeFileSync(path.join(root, 'store/video', name === 'main' ? 'chapters.json' : 'timecode-chapters.json'), JSON.stringify(chapters, null, 2) + '\n');
  execFileSync('ffmpeg', ['-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',concat,'-i',srt,'-map','0:v','-map','0:a','-map','1:0','-c:v','copy','-c:a','copy','-c:s','mov_text','-metadata:s:s:0','language=zho','-metadata','title=soonmarker 繁體中文操作教學','-movflags','+faststart',path.join(root,`dist/${outputBase}.mp4`)], { stdio: 'inherit' });
  console.log(`Finished: ${elapsed.toFixed(2)} seconds`);
})().catch(error => { console.error(error); process.exit(1); });
