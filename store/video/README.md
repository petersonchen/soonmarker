# soonmarker 教學影片

提供兩支 1280 × 800 的實際操作影片，使用 Meijia 台灣中文電腦旁白、繁體中文字幕與操作圈選。MP4、SRT 和原始錄製影格存放在被 Git 忽略的 dist/，不會隨原始碼 push。影片尚未上傳 YouTube 或商店。

## 影片一：標記、backlog 與 Episode 整理（約 1 分 59 秒）

- [MP4](../../dist/soonmarker-tutorial-zh-TW.mp4)／[SRT](../../dist/soonmarker-tutorial-zh-TW.srt)
- [文案與旁白](scenes.json)／[段落時間](chapters.json)

從沒有 Episode 的真實擴充功能開始：

1. 開啟 popup，輸入筆記並在 00:00:45 儲存標記。
2. 操作 CUE 定位暫停、PLAY 從標記播放。
3. 在管理頁看到 backlog：尚未加入任何 Episode 的影片會出現在這裡。第二支示範影片在錄製前透過匯入功能準備。
4. 在 EDIT 模式按「＋ 新增 Episode」，輸入 ep1，儲存後才出現這個 Episode。
5. 勾選 backlog 的兩支影片，將它們加入剛建立的 ep1。
6. 清空搜尋，在同一個 Episode 內拖拉影片標題左側的 ⋮⋮，調整影片順序。
7. 搜尋筆記與介紹儲存快捷鍵。

拖拉排序已核對實際資料順序反轉；此功能需要 EDIT 模式且搜尋欄為空。跨 Episode 拖拉代表加入該 Episode，與同一集內排序的行為不同，本片集中示範後者。

## 影片二：管理頁 timecode 微調（約 1 分 13 秒）

- [MP4](../../dist/soonmarker-timecode-zh-TW.mp4)／[SRT](../../dist/soonmarker-timecode-zh-TW.srt)
- [文案與旁白](timecode-scenes.json)／[段落時間](timecode-chapters.json)

1. 搜尋「教學示範」找到標記，切到 EDIT，點選 00:00:45 的時間欄位。
2. 按兩次 ↑，每次增加 1 秒，調整至 00:00:47。
3. 按三次 ↓，每次減少 1 秒，調整至 00:00:44。
4. 按 Shift+Enter，儲存 00:00:44 並在背景試播，管理頁與時間欄位保持焦點。
5. 再按 ↓ 到 00:00:43，按 Shift+Enter 重播。
6. 重新載入管理頁，確認 00:00:43 已保存。

錄製中逐次核對欄位值、storage 中的時間、影片實際播放狀態、管理分頁是否仍為 active，以及 timecode 欄位是否仍保有焦點。背景播放時間的提示取自真正播放器，並非模擬進度。

## 圈選與錄製方式

黃色框線圈出正在操作的按鈕、欄位或拖拉把手，對話框內的名稱和確認按鈕也會標示；圓點跟隨拖曳路徑。timecode 教學另顯示 ↑、↓、Shift+Enter 與背景影片播放狀態。這些都是教學註記，沒有修改擴充功能產品介面或功能。

影片一的新錄製操作使用獨立 Chrome for Testing profile，載入本專案實際擴充功能；CUE／PLAY 的播放器結果沿用前版已核對的真實錄影片段。影片二使用 helpdesk profile 既有的教學標記，錄製時暫時指定已開啟的示範影片分頁，完成後將該標記恢復為 45 秒並還原播放分頁指標；沒有替換整份資料。未展示安裝、TCC、IVOD 或實體系統快捷鍵操作。以每秒 6 張擷取，再輸出約 30 fps；旁白與字幕按段落對齊並留閱讀停頓。

## 示範影片來源

Big Buck Bunny © Blender Foundation，來源：[官方 YouTube 影片](https://www.youtube.com/watch?v=aqz-KE-bpKQ)。專案採 [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/)，見[官方專案說明](https://peach.blender.org/about/)。本教學擷取播放器畫面並縮放排版，未使用原片音軌；片尾附署名與授權。soonmarker 與 Blender Foundation 無隸屬或背書關係。

管理頁另以 [Sintel](https://www.youtube.com/watch?v=eRsGyueVLvQ) 的公開影片標題與自撰筆記示範整理，未擷取其影片影格。

## 重製

需要 macOS Meijia 語音、FFmpeg／ffprobe、Chrome for Testing 與 Playwright。使用 PLAYWRIGHT_MODULE 指向 Playwright 模組；CDP_ENDPOINT 預設為 http://127.0.0.1:9333。

請用新的專用 profile 載入本專案擴充功能，開啟管理頁與上述兩支 YouTube 分頁。第一支錄製程式會確認資料庫沒有 Episode 或 Marker，再透過實際操作建立示範資料。接著執行第二支，沿用第一支留下的 ep1 和 45 秒標記。

```sh
python3 scripts/prepare-tutorial-audio.py
node scripts/record-tutorial.cjs
node scripts/render-tutorial.cjs

TUTORIAL=timecode python3 scripts/prepare-tutorial-audio.py
node scripts/record-timecode-tutorial.cjs
TUTORIAL=timecode node scripts/render-tutorial.cjs
```

錄製註記共用程式在 scripts/tutorial-recorder.cjs。只換個別影片段落，可用 RENDER_SCENES 指定逗號分隔的段落 ID 重建後再合成整支影片；旁白變長時應重新錄製足夠影格。

## 本次驗證

兩支 MP4 均已完整解碼檢查，包含 H.264 畫面、AAC 旁白及中文字幕軌。已抽查新增 Episode 對話框、拖拉排序、↑／↓ 及 Shift+Enter 畫面，圈選未遮住操作內容。錄製驗證結果位於 dist/tutorial-work-v2/verification.json 與 dist/timecode-work/verification.json；helpdesk 教學標記已恢復 45 秒，原 ep1、ep2 及播放分頁指標保留，錄影註記已移除。
