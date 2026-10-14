# soonmarker Chrome Web Store 上架資料

準備日期：2026-10-04。對應目前 working tree 的 v0.3.0。本資料包尚未提交商店；已完成標記 popup 操作說明圖、5 張管理頁截圖與小型宣傳圖，公開隱私頁已核對，三站操作、實體快捷鍵及首次安裝已完成測試，詳見下方紀錄。

2026-10-14 更新：[helpdesk 上架前實測紀錄](verification-2026-10-14.md)。YouTube、TCC 歷史影音、IVOD Clip 的真實 popup 儲存／重載／CUE／PLAY，以及管理頁編輯與匯入匯出已通過。IVOD Full、實體快捷鍵與首次安裝由發布者確認實測通過；保留自動化測試遇到的逾時與權限限制紀錄。


## 可直接使用的文案與截圖說明

- [教學影片與製作說明](video/README.md)：兩支影片均含台灣中文旁白、繁體中文字幕及操作圈選。入門篇約 1 分 59 秒，含 backlog、新增 ep1 與拖拉排序；timecode 篇約 1 分 13 秒，示範 ↑／↓ 和 Shift+Enter。

- [繁體中文簡短說明](short-description-zh-TW.txt)：已採用並同步 manifest.description，封包已重新產生。
- [英文測試步驟](test-instructions-en.txt)：含已實測的 YouTube 影片及 ep1、ep2 操作。
- [繁體中文詳細說明](listing-zh-TW.txt)：純文字，可貼入商店詳細說明欄。
- [截圖拍攝與說明](screenshots.md)：拍攝順序、操作、配文與驗收項目。

## 商店欄位

| 欄位 | 建議內容 |
| --- | --- |
| 名稱 | soonmarker（與 manifest 一致） |
| 主要語言 | 繁體中文 |
| 分類 | 提升效率 → 工具（依本次後台顯示的選項） |
| 費用 | 建議免費；發布者在後台確認 |
| 簡短說明（已採用） | 為 YouTube、臺北市議會與立法院 IVOD 影片建立時間標記，快速定位播放，並依 Episode 整理片段。 |
| 目前封包簡短說明 | 為 YouTube、臺北市議會與立法院 IVOD 影片建立時間標記，快速定位播放，並依 Episode 整理片段。 |

簡短說明來自 manifest.description；2026-10-14 已採用繁中說明並重新打包。詳細說明可直接貼入商店欄位。

### 詳細說明（繁體中文）

在長影片中記下重要時刻，下次直接回到需要的片段。

soonmarker 讓你在支援的影音網站建立時間標記（Marker），加上說明，再用 CUE 定位並暫停，或用 PLAY 從標記位置開始播放。適合整理議事影音、研究資料與節目片段。

怎麼標記影片
1. 在支援的網站開啟影片，播放到想記錄的位置；也可以先暫停，方便輸入說明。
2. 點 Chrome 工具列的 soonmarker 圖示。找不到時，點右上角的擴充功能拼圖，選擇 soonmarker；可將它釘選到工具列。
3. 在「Marker 說明」輸入筆記，按「＋ 儲存目前位置」。儲存的是按下按鈕那一刻的影片時間，標記會出現在下方清單。
4. 按標記旁的 CUE 跳到該時間並暫停，或按 PLAY 從該時間播放。時間與說明都能直接修改。
5. 點「管理」，在 EDIT 模式建立 ep1、ep2，將影片加入 Episode 整理。

也可以在影片分頁按 Alt+Shift+M（macOS：Option+Shift+M），直接儲存目前位置，稍後再補筆記。

主要功能
• 一鍵儲存目前影片時間，也可使用 Alt+Shift+M 快捷鍵（macOS：Option+Shift+M）。
• 修改標記說明與時間，快速回看指定段落。
• 設定 0–60 秒的播放提前量，保留片段前的上下文。
• 以 Episode 整理影片；同一影片可加入多集並共用標記。
• 搜尋影片、標記說明與時間，拖曳調整影片順序。
• 匯出 Episode 或完整 JSON 備份；匯入 JSON、CSV、TSV，或貼上試算表儲存格。
• 選擇介面主題，調整顯示與播放設定。

支援網站
• YouTube：watch 與 live 影片頁。不支援 Shorts 或嵌入其他網站的播放器；廣告期間無法儲存標記。
• 臺北市議會雲端議事影音。
• 立法院議事轉播 IVOD：委員發言片段與完整會議影片，不支援直播頁。

資料與隱私
不需建立 soonmarker 帳號。影片標題、網址、標記、Episode 與設定保存在你的瀏覽器本機，沒有雲端自動同步、廣告或行為分析。開啟支援影片的擴充功能視窗時，會在本機保存該影片資訊。備份與分享由你主動操作；完整備份包含已刪除標記的紀錄。

使用提醒
soonmarker 儲存的是時間標記，不下載或剪輯影片。影片仍由原網站播放；網站內容、播放限制或瀏覽器自動播放設定可能影響操作。新分頁若被阻擋自動播放，請在影片上手動按播放。

soonmarker 為獨立開發工具，並非 YouTube、臺北市議會或立法院的官方產品，也不代表這些網站或機構的背書。

## Privacy practices 填寫稿

官方要求用途清楚且權限最小化；以下依目前程式整理，權限若變更須同步更新。[官方欄位說明](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)

### Single purpose

Help users save, organize, and revisit timestamped video markers on YouTube, Taipei City Council video pages, and Taiwan Legislative Yuan IVOD recordings. Episode organization, search, and local import/export support this same video-marker workflow.

### storage

Stores video URLs and titles, timestamped markers and notes, Episode membership and ordering, and display/playback preferences in chrome.storage.local. This enables persistent markers and the local video library. No cloud synchronization is used.

### unlimitedStorage

Allows the user's local marker library and imported JSON/CSV/TSV data to exceed the default local-storage quota. Libraries may contain many videos and notes, and complete backups retain deleted-marker records. All extension data remains in local storage; this permission does not upload data.

### scripting

Runs functions bundled with the extension in the supported video page's MAIN world to check player readiness and seek, pause, or play using the site's existing player APIs. No executable code is downloaded from a remote server.

### Host permissions

Access is restricted to https://www.youtube.com/*, https://live.tcc.gov.tw/*, and https://ivod.ly.gov.tw/*. On these sites, content scripts read video identity, title and playback state. Bundled scripts control playback when the user invokes CUE or PLAY. Persistent site access also allows the library page to open or reuse a video tab and seek after the player loads, without requiring a separate toolbar click in that tab.

### activeTab：已移除

三個網站已有 host_permissions，足以讀取支援分頁的網址並配合 scripting 控制播放器；目前 manifest 已移除重疊的 activeTab，保留 unlimitedStorage。已用 Chrome for Testing 真正載入擴充功能，在攔截的三站示範頁面驗證網址查詢、content script 訊息、快捷鍵儲存處理函式及 MAIN world CUE／PLAY。非支援網域不會提供 URL。此測試未操作實體快捷鍵，也不代表已完成真實影音網站播放驗證。[activeTab 官方說明](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab)

### Remote code

選擇「No, I am not using remote code」。目前 JS／CSS 隨擴充功能封裝；MAIN world 注入的是封包內函式，呼叫網站既有播放器介面，沒有下載可執行程式碼。

### 資料類型與用途

不能因為「只存本機」就填寫「完全不處理使用者資料」。Google 明確要求本機處理也揭露。[User Data FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq)

依現有行為，建議揭露以下類型；送出時逐項核對後台定義：

| 類型 | 對應資料 |
| --- | --- |
| Web history | 使用者開啟 popup、儲存或匯入的影片網址與標題；不是蒐集全部瀏覽歷史 |
| Website content | 影片標題、頁面影片識別資訊、使用者的 Marker 說明與 Episode 內容 |
| User activity | 影片播放時間及使用者儲存的時間標記；僅用於定位，不用於行為分析 |

目前沒有刻意讀取身分、付款、健康、登入憑證、私人通訊或定位資料的功能。不要將自行輸入的任意文字描述為會被分析或分類成這些資料。

三項用途認證可依目前行為勾選：不出售或轉移至核准用途以外的第三方、不用於與單一用途無關的目的、不用於信用或借貸判斷。發布者需確認實際發布版維持上述行為。

## 公開連結與帳號資料

以下網址已於 2026-10-04 以未登入的 HTTP 請求確認回傳 200。公開 PRIVACY.md 已與本機內容逐位元組比對一致；不要把本機路徑填進商店：

| 用途 | 候選網址／待辦 |
| --- | --- |
| 首頁 | https://github.com/petersonchen/soonmarker |
| 隱私政策 | https://github.com/petersonchen/soonmarker/blob/main/PRIVACY.md |
| 支援 | https://github.com/petersonchen/soonmarker/issues （頁面已可公開讀取；發布者需持續受理問題） |
| 發布者名稱 | 請以實際個人或組織身分填寫；程式授權署名為 Peterson Chen |
| 聯絡信箱 | 待發布者提供並在後台驗證，不推測私人信箱 |

公開隱私頁必須是本次更新後的內容，且未登入也能讀取；若 repository 不公開，另找公開頁面放置。開發者帳號需完成註冊費、帳號驗證及兩步驟驗證，實際費用依註冊畫面為準。[註冊說明](https://developer.chrome.com/docs/webstore/register)

## 商店圖片製作清單

| 素材 | 規格 | 狀態／內容 |
| --- | --- | --- |
| 商店圖示 | 128 × 128 PNG | 已有 ../icons/icon-128.png |
| 截圖 1 | 1280 × 800 | [如何標記影片](screenshots/00-mark-video.png)：真實 popup 輸入說明、儲存與新增標記的前後畫面 |
| 截圖 2 | 1280 × 800 | [Episode 整理](screenshots/01-library.png)：ep1、ep2 與標記 |
| 截圖 3 | 1280 × 800 | [EDIT 編輯](screenshots/02-edit.png)：修改筆記 |
| 截圖 4 | 1280 × 800 | [搜尋](screenshots/03-search.png)：尋找角色相關筆記 |
| 截圖 5 | 1280 × 800 | [匯入預覽](screenshots/05-import.png)：預覽建立 ep3 |
| 備選截圖 | 1280 × 800 | [PLAY 模式](screenshots/04-play.png)：需要時替換上方一張，上傳總數不超過 5 張 |
| 小型宣傳圖 | 440 × 280 | [PNG](promo-small.png)／[SVG 原稿](promo-small.svg) |
| Marquee | 1400 × 560 | 選用，非首次送審的優先項目 |

截圖至少 1 張、最多 5 張，可用 1280 × 800 或 640 × 400，建議前者；440 × 280 小型宣傳圖為必要素材。畫面應展示真實介面，使用可公開的示範資料，避免出現私人筆記或帳號資訊，不暗示支援影片下載或所有網站。[官方圖片規格](https://developer.chrome.com/docs/webstore/images)

## Test instructions（英文可貼）

No soonmarker account, subscription, or test credentials are required. Use a publicly accessible, seekable video on a supported website. A website may impose its own availability restrictions.

1. Open a YouTube watch page and wait for any advertisement to finish. Start playback, then open the soonmarker toolbar popup.
2. Enter a marker note and click “＋ 儲存目前位置”. Confirm that a timestamped marker appears. Reload the video page and reopen the popup; the marker should remain.
3. Click CUE for the marker: playback should seek to the marker and pause. Click PLAY: playback should seek and start. If Chrome blocks autoplay, press play on the website.
4. Press Alt+Shift+M (Option+Shift+M on macOS) on the video page. A new marker should be saved. If the shortcut is occupied, configure it at chrome://extensions/shortcuts.
5. Click “管理” in the popup. A fresh installation defaults to EDIT mode. Create ep1 and add the video; create ep2 to test shared membership. Edit a marker's note and timestamp, then search for that note.
6. Export the Episode as JSON and preview importing it. Duplicate marker IDs should not create duplicate markers. A complete backup includes settings and deleted-marker records.
7. Repeat save/CUE/PLAY on a Taipei City Council recording at https://live.tcc.gov.tw/ and an IVOD recording at https://ivod.ly.gov.tw/ (Play/Clip or Play/Full).
8. YouTube Shorts, embedded players on other domains, and IVOD live pages are unsupported. YouTube advertisements must finish before saving a marker.

每站已實測錄影深層連結已補入 [英文測試說明](test-instructions-en.txt)，詳見 2026-10-14 實測紀錄。IVOD Full 已由發布者實測通過，審查用深層連結仍待補入；不要拿未實測的示範影片 ID 當審查連結。

## 打包與送審清單

執行 `python3 scripts/package-store.py` 產生 `dist/soonmarker-0.3.0.zip`。只封裝執行檔、圖示及授權／隱私文件，manifest 位於 ZIP 根目錄。這是目前程式快照，不代表真人網站測試或商店審核通過。修改程式後必須重跑打包。本輪已重新產生 ZIP，確認包含首次安裝預設 EDIT，且不含 store/、tests/ 或 scripts/。

- [x] 核對 manifest v3、版本及本機資料流。
- [x] 修正隱私文件的完整備份／刪除描述，補上 Episode、設定、匯入與影片網站連線說明。
- [x] `node --test tests/library.test.cjs`：24 項通過（2026-10-14 重跑）。
- [x] 移除 activeTab，通過隔離瀏覽器的三站權限測試，並重新打包。
- [x] 完成實際 Chrome 三站測試；2026-10-14 helpdesk 已通過 YouTube、TCC、IVOD Clip 的真實 popup 儲存／重載／CUE／PLAY，管理頁編輯與匯入匯出也通過；IVOD Full、實體快捷鍵與首次安裝由發布者確認實測通過，詳見實測紀錄。
- [x] `tests/manage.browser.cjs` 通過：使用既有 npm 快取的 Playwright 與獨立 Chrome；涵蓋管理頁、匯入匯出、並行編輯與 popup，無頁面錯誤。此套測試使用模擬 storage/API，另以真正載入的擴充功能驗證權限。
- [x] 完成真實 popup 標記操作圖、5 張管理頁截圖與小型宣傳圖；拍攝說明與公開示範備份見 screenshots.md。
- [x] 確認最新版 PRIVACY.md 公開可讀且與本機一致，首頁／支援連結皆回傳 HTTP 200。
- [ ] 確認發布者名稱、聯絡信箱、免費／地區／公開範圍。
- [ ] 上傳 ZIP，填寫 Store listing、Privacy practices、Distribution、Test instructions。
- [ ] 最後核對商店說明與封包相符，再提交審查。可選通過後手動發布；核准後的待發布期限以後台為準。

提交流程依 [Chrome Web Store 官方發布文件](https://developer.chrome.com/docs/webstore/publish)。
