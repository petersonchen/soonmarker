# 2026-10-14 上架前實測

使用 helpdesk profile、Google Chrome 155.0.8059.40，透過 `http://127.0.0.1:9333` CDP 操作目前 working tree 的 soonmarker v0.3.0。未攔截網站回應、未模擬 chrome.storage 或播放器；標記操作使用真正的 toolbar popup。

## 測試結果

| 項目 | 結果 | 驗證內容 |
| --- | --- | --- |
| YouTube watch | 通過 | 在 45 秒儲存，影片重載後標記保留；CUE 定位 45 秒且持續暫停；PLAY 後時間推進到約 46.47 秒 |
| TCC 歷史影音 | 通過 | 在 45 秒儲存，影片重載後標記保留；CUE 定位 45 秒且持續暫停；PLAY 後時間推進到約 46.45 秒 |
| IVOD Clip | 通過 | 在 45 秒儲存，影片重載後標記保留；CUE 定位 45 秒且持續暫停；PLAY 後時間推進到約 46.45 秒 |
| IVOD Full | 未完成 | Full/1M/17330 首次載入可儲存，但重載出現原網站 HLS manifestLoadTimeOut；Full/1M/17722 與 Full/300K/17330 也無法穩定載入。CUE／PLAY 尚未驗證，不能列為通過 |
| 管理頁 | 通過 | 從對話框建立 QA Episode、加入影片、修改筆記與時間至 47 秒、搜尋、匯出 Episode JSON、預覽並匯入第二個 Episode；未增加重複 Marker，兩個 Episode 與編輯內容在重載後保留，未觀察到 pageerror |
| 實體快捷鍵 | 未完成 | Chrome 設定為 Option+Shift+M。macOS System Events 拒絕 osascript 送出按鍵（1002），此次自動化未完成；未用直接呼叫處理函式替代此項 |
| 資料處理測試 | 通過 | `node --test tests/library.test.cjs`，24 項通過 |

補測發布者指定的 ep3 IVOD 第 2 個 Marker：[吳思瑤委員片段](https://ivod.ly.gov.tw/Play/Clip/1M/171174)。首次載入、重載、管理頁 CUE 與 PLAY 全部通過；CUE 暫停在 243.274955 秒，PLAY 後推進到 244.334592 秒。此次 local storage 與補測前一致。此網址屬於 Clip，不能用這筆結果替代 Full 驗證。前述 Full 逾時只代表本次所選影片與連線的觀察，不表示所有完整會議均無法播放；原因尚未確認。補測證據為 `dist/store-verification/ep3-marker2.json`。

## 已實測影片

- YouTube：[Sintel](https://www.youtube.com/watch?v=eRsGyueVLvQ)。
- TCC：[2026-10-02 民政委員會歷史影音](https://live.tcc.gov.tw/iSharePortalWeb/User/VideoData.aspx?vdvno=df8f90b0-f267-4df7-8cd1-4cc63f0b1cf8)。
- IVOD Clip：[2026-04-08 丁學忠委員發言](https://ivod.ly.gov.tw/Play/Clip/1M/168273)。

以上在本次 helpdesk session 無需登入即可播放；未另以全新 profile 驗證。IVOD Full 尚無通過本次完整測試的審查連結。

## 資料保存與清理

開始前將既有 local／session storage 備份至被 Git 忽略的 `dist/store-verification/helpdesk-before.json`，不得加入公開商店素材。測試筆記與 Episode 使用 `STORE-QA-2026-10-14-` 前綴。

已清理此次 QA 標記、Episode 及新增影片資訊，還原被測試變更的模式與上次 Episode 設定；清理後 local storage 與測試前備份無差異。瀏覽器保留測試影片分頁，方便補測。

原始結果位於被 Git 忽略的 `dist/store-verification/`：`youtube.json`、`tcc.json`、`ivod-clip.json`、`ivod-full.json`、`ivod-full-source.json`、`manage.json`、`shortcuts.json`、`cleanup.json`。部分檔案含 helpdesk 既有資料，勿公開上傳。

## 發布者補測確認

2026-10-14 發布者於對話確認已完成剩餘第 1 項測試，涵蓋 IVOD Full 的重載／CUE／PLAY、實體 Option+Shift+M 快捷鍵及首次安裝空資料流程。此確認作為上架測試完成依據；上表保留本次自動化測試的原始結果，未將發布者補測描述為自動化通過。

IVOD Full 的實測網址尚未提供，需補進審查用英文測試說明。

## 封包定稿

2026-10-14 採用 `store/short-description-zh-TW.txt` 的繁中簡短說明，同步 manifest.description 並重新產生 v0.3.0 ZIP。此次僅修改說明文字，未變更執行邏輯。
