# Jett Portfolio - 專案現況分析報告

> **生成日期**: 2026-02-17  
> **分析範圍**: 完整代碼架構、功能邏輯、前端標準對比  
> **分析目的**: 逆向 PRD + 缺失與優化清單

### 修正紀錄

- **2026-02-17** 第一批：圖片優化（尺寸、fallback、`public/placeholder.svg`）、錯誤處理（About fallback、圖片 onerror）、內容管理（`consts.ts` + Schema 使用 SITE_URL、TODO 註解）、SEO（theme-color）、安全性（外連 `rel="noopener noreferrer"`）、A11y（skip-to-content、`:focus-visible`）。詳見缺失與優化清單中已勾選項目。

---

## 📋 目錄

1. [專案概覽](#專案概覽)
2. [逆向 PRD - 現有功能與邏輯](#逆向-prd---現有功能與邏輯)
3. [代碼架構分析](#代碼架構分析)
4. [專業前端標準對比](#專業前端標準對比)
5. [缺失與優化清單](#缺失與優化清單)
6. [優先級建議](#優先級建議)

---

## 專案概覽

### 技術棧

- **核心框架**: Astro v5.17.1 (SSG 靜態生成)
- **樣式預處理**: SCSS/SASS + modern-normalize
- **圖標系統**: Lucide Icons (via astro-icon)
- **動畫庫**: GSAP (含 ScrollToPlugin)
- **圖片優化**: Sharp
- **類型系統**: TypeScript (strict mode)
- **內容管理**: Astro Content Collections (Zod schema validation)

### 專案結構

```
src/
├── components/          # UI 元件
│   ├── BaseHead/       # SEO meta tags 管理
│   ├── CursorShadow/   # 游標追蹤效果
│   ├── Footer/         # 頁尾元件（手機版導航）
│   └── ThemeToggle/    # 深色模式切換
├── content/            # 內容來源 (Markdown)
│   ├── about/          # 自我介紹
│   ├── experience/     # 工作經歷
│   ├── projects/       # 專案作品
│   └── articles/       # 技術文章
├── layouts/            # 頁面佈局
│   └── BaseLayout.astro # 基礎佈局（含平滑滾動）
├── pages/             # 路由頁面
│   └── index.astro     # 首頁（單頁應用）
├── styles/            # 樣式系統
│   ├── global.scss     # 全域樣式 + CSS 變數
│   └── variables.scss  # SCSS 變數（未使用）
└── consts.ts          # 全域常數
```

---

## 逆向 PRD - 現有功能與邏輯

### 1. 核心功能

#### 1.1 首頁展示 (Single Page Application)

**功能描述**: 單頁式作品集網站，包含四個主要區塊：

- **Header 區塊** (桌面版左側固定)
  - 個人名稱與職稱
  - 簡短介紹文字
  - 桌面版導航連結（ABOUT, EXPERIENCE, PROJECTS）
  - 社群媒體連結（GitHub, LinkedIn, Email）
  - 響應式：桌面版 sticky，手機版隱藏導航

- **About 區塊**
  - 從 `content/about/index.md` 動態載入
  - 支援 Markdown 渲染

- **Experience 區塊**
  - 從 `content/experience/` 載入多筆經歷
  - 依 `order` 欄位排序
  - 顯示：日期、職稱、公司名稱（可點擊連結）、描述、相關連結、技術標籤
  - 卡片式設計，hover 效果

- **Projects 區塊**
  - 從 `content/projects/` 載入專案列表
  - 依 `order` 排序
  - 顯示：縮圖、標題（外連）、描述、統計數據、技術標籤
  - 卡片式設計

- **Articles 區塊**
  - 從 `content/articles/` 載入文章列表
  - 依 `order` 排序
  - 顯示：縮圖、標題（外連）、描述
  - 卡片式設計

#### 1.2 深色模式 (Dark Mode)

**功能描述**: 完整的深色/淺色主題切換系統

- **初始化邏輯**:
  1. 優先讀取 `localStorage.getItem('theme')`
  2. 其次跟隨系統偏好 `prefers-color-scheme`
  3. 預設為淺色模式

- **切換機制**:
  - `ThemeToggle` 元件提供切換按鈕
  - 透過 `data-theme="dark"` 屬性控制
  - 狀態持久化至 localStorage

- **樣式系統**:
  - CSS 變數架構（`:root` 與 `[data-theme='dark']`）
  - 完整的顏色系統（primary, secondary, bg, text, border, shadow）
  - 支援聚光燈效果顏色調整

#### 1.3 平滑滾動 (Smooth Scroll)

**功能描述**: 使用 GSAP ScrollToPlugin 實現錨點平滑滾動

- **觸發條件**: 點擊 `href` 以 `#` 開頭的連結
- **動畫參數**:
  - Duration: 1.2s
  - Easing: `power4.inOut`
  - 自動更新 URL hash

#### 1.4 游標追蹤效果 (Cursor Shadow)

**功能描述**: 桌面版專屬的游標視覺效果

- **顯示條件**: 
  - 螢幕寬度 ≥ 1024px
  - 且為非觸控設備 (`pointer: fine`)

- **視覺元素**:
  - **外圈**: 16px 圓圈，跟隨游標
  - **聚光燈**: 600px 徑向漸層，模糊效果，screen blend mode

- **效能優化**: 使用 `requestAnimationFrame` 優化動畫流暢度

#### 1.5 響應式設計

**功能描述**: 針對桌面與行動裝置的完整適配

- **桌面版 (≥1024px)**:
  - 左右分欄佈局（40% header + 60% content）
  - Header sticky，高度 100vh
  - 顯示桌面導航

- **手機版 (<1024px)**:
  - 單欄垂直佈局
  - 隱藏桌面導航
  - 顯示手機版黏性 header（各 section 標題）
  - 顯示底部導航欄（玻璃質感，含主題切換）

#### 1.6 SEO 優化

**功能描述**: 完整的 SEO 基礎建設

- **Meta Tags**:
  - Title, Description
  - Open Graph (Facebook)
  - Twitter Card
  - Canonical URL
  - Generator tag

- **結構化資料**:
  - JSON-LD Person Schema
  - 包含：name, url, jobTitle, description, knowsAbout

- **語意化 HTML**:
  - 使用 `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`
  - ARIA labels (`aria-label`)

- **其他**:
  - Sitemap 整合 (`@astrojs/sitemap`)
  - RSS Feed 整合 (`@astrojs/rss`)
  - 字體預載入

### 2. 內容管理系統

#### 2.1 Content Collections

**架構**: 使用 Astro Content Collections + Zod Schema 驗證

**Collections**:
- `about`: 單一文件，title 欄位
- `experience`: 多文件，包含 order, date, title, company, companyUrl, links, tags
- `projects`: 多文件，包含 order, title, image, url, tags, stats
- `articles`: 多文件，包含 order, title, image, url

**優點**:
- Type-safe 內容查詢
- 自動驗證資料結構
- 支援 Markdown 渲染

### 3. 樣式系統

#### 3.1 CSS 變數架構

**設計模式**: CSS Custom Properties + 主題切換

- **顏色系統**: primary, secondary, bg (primary/secondary/tertiary), text (primary/secondary/tertiary), border, shadow
- **間距系統**: xs, sm, md, lg, xl, 2xl
- **圓角系統**: sm, md, lg, xl, 2xl, 3xl
- **Z-index 層級**: dropdown, sticky, fixed, modal, popover, tooltip

#### 3.2 設計風格

- **卡片設計**: 圓角 1.25rem，陰影，hover 效果
- **玻璃質感**: backdrop-filter blur（手機版導航）
- **日系風格**: 圓角、柔和陰影、間距寬鬆

---

## 代碼架構分析

### 優點

1. **清晰的專案結構**
   - 元件、內容、樣式分離明確
   - Content Collections 提供類型安全

2. **現代化技術棧**
   - Astro SSG 提供優秀效能
   - TypeScript strict mode
   - SCSS 模組化

3. **SEO 基礎完善**
   - 完整的 meta tags
   - 結構化資料
   - 語意化 HTML

4. **響應式設計**
   - 完整的桌面/手機適配
   - 考慮觸控設備

5. **無障礙設計意識**
   - ARIA labels
   - sr-only 文字
   - 語意化標籤

### 潛在問題

1. **代碼重複**
   - `index.scss` 中 projects、articles、experience 卡片樣式高度相似
   - 可提取為共用 mixin 或元件

2. **未使用的資源**
   - `variables.scss` 定義了 SCSS 變數但未被引用
   - CSS 變數與 SCSS 變數系統並存但未統一

3. **硬編碼值**
   - `consts.ts` 中的 SITE_TITLE、SITE_DESCRIPTION 為預設值
   - Schema 中的 URL 為 placeholder (`https://your-domain.com`)

4. **圖片處理**
   - 專案圖片使用外部 URL (`placehold.co`)
   - 未使用 Astro Image Optimization

5. **錯誤處理**
   - 缺少內容載入失敗的 fallback
   - 缺少圖片載入失敗處理

---

## 專業前端標準對比

### ✅ 已符合標準

1. **效能優化**
   - ✅ SSG 靜態生成
   - ✅ 圖片 lazy loading
   - ✅ 字體預載入
   - ✅ CSS 變數（減少重複計算）

2. **SEO**
   - ✅ Meta tags 完整
   - ✅ 結構化資料
   - ✅ Sitemap
   - ✅ RSS Feed

3. **無障礙設計 (A11y)**
   - ✅ ARIA labels
   - ✅ 語意化 HTML
   - ✅ 鍵盤導航支援（部分）

4. **響應式設計**
   - ✅ Mobile-first 思維
   - ✅ 斷點設計合理
   - ✅ 觸控設備適配

5. **代碼品質**
   - ✅ TypeScript strict mode
   - ✅ 模組化結構
   - ✅ 內容類型驗證

### ❌ 缺失標準

#### 1. 效能優化

- ❌ **缺少圖片優化**
  - 未使用 Astro `<Image>` 元件
  - 未設定圖片尺寸（避免 CLS）
  - 未使用 WebP/AVIF 格式

- ❌ **缺少資源預載入策略**
  - 關鍵 CSS 未內聯
  - 關鍵字體未使用 `font-display: swap`

- ❌ **缺少效能監控**
  - 無 Web Vitals 追蹤
  - 無錯誤追蹤（Sentry 等）

#### 2. SEO

- ❌ **結構化資料不完整**
  - Person Schema 缺少實際 URL
  - 缺少 Article Schema（文章頁面）
  - 缺少 BreadcrumbList Schema

- ❌ **Meta 標籤可優化**
  - 缺少 `og:locale`
  - 缺少 `article:author`（文章頁面）
  - 缺少 `theme-color`

- ❌ **缺少 robots.txt 優化**
  - 未見自訂 robots.txt
  - 未設定 crawl-delay

#### 3. 無障礙設計 (A11y)

- ❌ **鍵盤導航不完整**
  - ThemeToggle 缺少 focus 樣式
  - 導航連結缺少 focus 指示器
  - 缺少 skip to content 連結

- ❌ **顏色對比度**
  - 未驗證 WCAG AA 標準
  - 部分文字顏色對比度可能不足

- ❌ **動畫控制**
  - 雖有 `prefers-reduced-motion`，但 GSAP 動畫未完全尊重
  - 游標效果未提供關閉選項

#### 4. 安全性

- ❌ **缺少安全標頭**
  - 未設定 CSP (Content Security Policy)
  - 未設定安全相關 meta tags

- ❌ **外部資源**
  - 使用外部圖片服務（placehold.co）
  - 未設定 `rel="noopener noreferrer"`（部分外連）

#### 5. 代碼品質

- ❌ **缺少測試**
  - 無單元測試
  - 無 E2E 測試
  - 無視覺回歸測試

- ❌ **缺少 CI/CD**
  - 未見 GitHub Actions 配置
  - 缺少自動化部署流程

- ❌ **缺少程式碼規範**
  - 未見 ESLint 配置
  - 雖有 Prettier，但未見配置檔案

- ❌ **缺少錯誤邊界**
  - 無錯誤處理機制
  - 無 fallback UI

#### 6. 開發體驗

- ❌ **缺少環境變數管理**
  - 硬編碼 URL
  - 缺少 `.env.example`

- ❌ **缺少文檔**
  - README 基本，缺少 API 文檔
  - 缺少元件使用文檔
  - 缺少部署指南

#### 7. 現代化實踐

- ❌ **缺少 PWA 支援**
  - 無 Service Worker
  - 無 manifest.json
  - 無離線支援

- ❌ **缺少國際化 (i18n)**
  - 內容僅支援繁體中文
  - 未使用 Astro i18n 整合

- ❌ **缺少分析追蹤**
  - 無 Google Analytics
  - 無自訂事件追蹤

---

## 缺失與優化清單

### 🔴 高優先級（核心功能與體驗）

#### 1. 圖片優化系統
- [ ] 使用 Astro `<Image>` 元件取代 `<img>`（目前外連圖片保留 `<img>` + 尺寸 + fallback）
- [x] 設定圖片尺寸避免 CLS（完成時間：2026-02-17）
- [x] 實作圖片 fallback（載入失敗顯示預設圖，`public/placeholder.svg`）（完成時間：2026-02-17）
- [ ] 考慮使用 WebP/AVIF 格式

#### 2. 錯誤處理與 Fallback
- [x] 內容載入失敗時顯示友好訊息（About 區塊 + `.content-fallback`）（完成時間：2026-02-17）
- [x] 圖片載入失敗處理（`onerror` → placeholder）（完成時間：2026-02-17）
- [ ] 網路錯誤處理

#### 3. 鍵盤導航與 A11y 完善
- [x] 為所有互動元素添加 focus 樣式（`global.scss` 內 `:focus-visible`）（完成時間：2026-02-17）
- [x] 實作 skip to content 連結（完成時間：2026-02-17）
- [ ] 驗證顏色對比度（WCAG AA）
- [ ] 為游標效果添加關閉選項（偏好設定）

#### 4. 內容管理優化
- [x] 更新 `consts.ts` 結構並加上 TODO 註解（SITE_TITLE、SITE_DESCRIPTION、SITE_URL）（完成時間：2026-02-17）
- [x] 修正 Schema 中的 placeholder URL（改為使用 `consts.SITE_URL`）（完成時間：2026-02-17）
- [ ] 將外部圖片遷移至本地或 CDN

### 🟡 中優先級（品質提升）

#### 5. 代碼重構
- [ ] 提取共用卡片樣式為 mixin
- [ ] 統一變數系統（選擇 CSS 變數或 SCSS 變數）
- [ ] 移除未使用的 `variables.scss` 或整合使用

#### 6. SEO 優化
- [ ] 完善結構化資料（實際 URL、Article Schema）
- [x] 添加 `theme-color` meta tag（完成時間：2026-02-17）
- [ ] 優化 meta 描述（每頁獨立）
- [ ] 實作自訂 robots.txt

#### 7. 效能監控
- [ ] 整合 Web Vitals 追蹤
- [ ] 添加錯誤追蹤（Sentry 或類似服務）
- [ ] 實作效能預算檢查

#### 8. 安全性強化
- [ ] 設定 CSP headers
- [x] 為所有外連添加 `rel="noopener noreferrer"`（完成時間：2026-02-17）
- [ ] 審查外部資源安全性

### 🟢 低優先級（進階功能）

#### 9. 測試基礎建設
- [ ] 設定測試框架（Vitest）
- [ ] 撰寫關鍵元件單元測試
- [ ] 實作 E2E 測試（Playwright）

#### 10. CI/CD 流程
- [ ] 設定 GitHub Actions
- [ ] 自動化建置與部署
- [ ] 自動化測試執行

#### 11. PWA 支援
- [ ] 實作 Service Worker
- [ ] 添加 manifest.json
- [ ] 離線頁面支援

#### 12. 國際化 (i18n)
- [ ] 評估多語言需求
- [ ] 整合 Astro i18n（如需要）

#### 13. 分析與追蹤
- [ ] 整合 Google Analytics 4
- [ ] 實作自訂事件追蹤
- [ ] 隱私權政策合規（GDPR）

#### 14. 開發體驗優化
- [ ] 設定環境變數系統
- [ ] 完善 README 文檔
- [ ] 添加元件使用範例
- [ ] 設定 ESLint + Prettier 配置

---

## 優先級建議

### 第一階段（立即執行）

1. **圖片優化** - 影響 Core Web Vitals，直接影響 SEO 排名
2. **錯誤處理** - 提升使用者體驗，避免白屏
3. **內容更新** - 修正 placeholder，確保資訊正確

### 第二階段（本週完成）

4. **A11y 完善** - 符合無障礙標準，擴大使用者群體
5. **代碼重構** - 提升可維護性，減少技術債
6. **SEO 優化** - 提升搜尋引擎可見度

### 第三階段（本月完成）

7. **測試基礎建設** - 確保代碼品質
8. **CI/CD 流程** - 自動化部署，減少人為錯誤
9. **效能監控** - 持續優化依據

### 第四階段（長期規劃）

10. **PWA 支援** - 提升使用者體驗
11. **國際化** - 擴大市場
12. **分析追蹤** - 數據驅動優化

---

## 技術債務清單

1. **變數系統不一致** - CSS 變數與 SCSS 變數並存
2. **代碼重複** - 卡片樣式高度相似
3. **硬編碼值** - URL、標題等應改為配置
4. **缺少測試** - 無自動化測試保護
5. **缺少文檔** - 元件使用方式未文檔化

---

## 總結

### 專案優勢

- ✅ 現代化技術棧（Astro + TypeScript）
- ✅ 清晰的專案結構
- ✅ 完整的 SEO 基礎建設
- ✅ 良好的響應式設計
- ✅ 無障礙設計意識

### 改進方向

- 🔧 圖片優化與錯誤處理
- 🔧 代碼重構與統一
- 🔧 測試與 CI/CD 基礎建設
- 🔧 進階功能（PWA、i18n）

### 整體評估

**當前狀態**: 專案基礎穩固，核心功能完整，但在生產環境最佳實踐方面仍有改進空間。

**建議**: 優先處理高優先級項目（圖片優化、錯誤處理、A11y），這些直接影響使用者體驗與 SEO 表現。中低優先級項目可依專案時程逐步實作。

---

**報告結束**
