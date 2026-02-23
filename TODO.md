# TODO — SEO / AEO / GEO 改進清單

本專案需兼顧 **SEO**（搜尋引擎優化）、**AEO**（Answer Engine Optimization，答題／精選摘要優化）、**GEO**（Generative Engine Optimization，生成式引擎／AI 引用優化）。以下為可執行項目，完成後可在前方打勾 `[x]`。

---

## 一、SEO（搜尋引擎優化）

### 1.1 站點與 Meta 基礎

- [ ] **consts.ts**：將 `SITE_TITLE`、`SITE_DESCRIPTION`、`SITE_URL` 改為實際站點名稱、描述與正式網址（勿留 `Astro Blog` / `your-domain.com`）。
- [ ] **astro.config.mjs**：將 `site: "https://example.com"` 改為與 `SITE_URL` 一致的正式網址。
- [ ] **BaseHead**：確認 `canonical`、`og:url`、`twitter:url` 皆使用 `Astro.site`（依 config 的 `site`），建置後檢查 HTML 輸出是否正確。

### 1.2 結構化資料（Schema.org）

- [ ] **Person**：目前首頁已有 Person JSON-LD；補齊 `image`、`sameAs`（社群連結）、`knowsAbout` 與實際技能關鍵字。
- [ ] **WebSite**：新增 WebSite schema（`url`、`name`、`description`），可與 Person 並列或透過 `mainEntity` 關聯，利於站點層級收錄。
- [ ] **BreadcrumbList**：若日後有多頁（例如文章內頁），為每頁加上 BreadcrumbList，有助搜尋結果顯示麵包屑。

### 1.3 技術 SEO

- [ ] **robots.txt**：確認建置產出或 `public/robots.txt` 存在且允許爬取、指向正確的 `sitemap` URL。
- [ ] **Sitemap**：確認 `@astrojs/sitemap` 產出的 sitemap 包含首頁且 URL 為正式網域。
- [ ] **標題階層**：全站僅一個 `<h1>`（目前為首頁「Jett」）；其餘區塊標題使用 `<h2>`，子標題依序 `<h3>`，避免跳級。
- [ ] **圖片**：所有 `<img>` 與 Astro `<Image>` 皆提供有意義的 `alt`（專案／文章卡片已部分具備，需全面檢查）。

### 1.4 效能與 Core Web Vitals

- [ ] 關鍵圖片使用 Astro Image 或適當 `width`/`height`，減少 CLS。
- [ ] 非關鍵 CSS/JS 考慮延遲載入；評估 CursorShadow、GSAP 是否需在行動裝置關閉以利 LCP。
- [ ] 若有字體載入，保持 `preload` + `font-display: optional` 或 `swap`，避免 FOIT 影響 LCP。

---

## 二、AEO（Answer Engine / 精選摘要優化）

### 2.1 結構化答題與定義

- [ ] **FAQPage**：若新增「常見問題」區塊，使用 FAQPage schema，有助語音助理與精選摘要。
- [ ] **HowTo**：可將「合作流程」區塊（workflow）改寫為 HowTo schema（步驟明確、簡短說明），利於「如何與 Jett 合作」等查詢。
- [ ] **定義型內容**：關於我、服務項目以「誰／做什麼／擅長什麼」的清晰句子撰寫，方便被擷取為定義或簡短回答。

### 2.2 內容撰寫建議

- [ ] 每個服務／流程步驟有 1～2 句精煉說明，適合做為 featured snippet 或語音回答。
- [ ] 重要關鍵字（職稱、服務類型、技術棧）在標題或段落開頭自然出現，避免僅藏在長段落中。

---

## 三、GEO（生成式引擎／AI 引用優化）

### 3.1 作者與專業身份

- [ ] **Person schema 強化**：補齊 `jobTitle`、`description`、`knowsAbout`、`url`、`sameAs`，讓 AI 能明確識別「誰是 Jett、專長為何」。
- [ ] **單一真實來源**：關於我、Header 職稱、Footer 等處的「名稱 + 職稱 + 一句介紹」盡量一致，利於 AI 彙整為單一實體。

### 3.2 內容結構與可引用性

- [ ] 關於我、服務、流程以簡潔段落與列表呈現，方便 LLM 擷取要點並附上來源。
- [ ] 若有部落格或文章內頁，每篇具備明確 `author`、`datePublished`、`dateModified` 與對應 schema（Article），提升被引用機會。

### 3.3 技術面

- [ ] 確保重要介紹與服務說明在 **HTML 正文** 中可見，而非僅放在 JS 動態內容或過多互動才顯示。
- [ ] 保持語意化標籤（`<section>`、`<article>`、標題階層），方便爬蟲與生成式引擎理解結構。

---

## 四、通用與維護

- [ ] 上線前：用 Google Search Console、Rich Results Test 檢查首頁 meta 與結構化資料。
- [ ] 可選：提交 sitemap 至 GSC、Bing Webmaster；若有 RSS，可提交至相關服務。
- [ ] 內容更新後，同步檢查 CURRENT_STATUS.md 與本 TODO.md，勾選已完成項目或新增項目。

---

*完成一項即在前方改為 `[x]`，並可註記完成日期或備註於該行後方。*
