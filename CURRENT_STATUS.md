# Jett Portfolio — 專案現況

> 本文件描述專案**目前狀態**，供後續迭代與交接參考。  
> 最後更新：依本次重寫日為準。

---

## 1. 專案定位

個人作品集／接案展示站：單頁式 (SPA) 架構，主打 **SEO / AEO / GEO** 友善，用於呈現經歷、專案、文章、服務項目與合作流程，目標對象包含潛在客戶與搜尋／AI 引擎。

---

## 2. 技術棧

| 項目 | 說明 |
|------|------|
| 框架 | Astro v5（SSG 靜態生成） |
| 樣式 | SCSS/SASS、modern-normalize、CSS 變數（淺/深主題） |
| 圖標 | Lucide Icons（astro-icon） |
| 動畫 | GSAP（含 ScrollToPlugin 平滑捲動） |
| 內容 | Astro Content Collections + Zod schema |
| 套件管理 | pnpm |

---

## 3. 專案結構（現狀）

```
src/
├── components/
│   ├── AboutSection/       # 關於我區塊
│   ├── ArticlesSection/    # 文章列表區塊
│   ├── ArticleCard/        # 文章卡片
│   ├── BaseHead/           # 全域 meta、OG、theme-color
│   ├── CursorShadow/       # 桌面版游標效果
│   ├── ExperienceSection/  # 經歷區塊
│   ├── ExperienceCard/     # 經歷卡片（兩欄：日期｜內容）
│   ├── Footer/             # 手機版底部導航
│   ├── NavigationLinks/    # 側欄導航（含 scroll-spy 高亮）
│   ├── ProjectCard/        # 專案卡片
│   ├── ProjectsSection/    # 專案區塊
│   ├── ServicesSection/    # 服務區塊（Content Collection）
│   ├── ThemeToggle/        # 深色模式切換（置於 .home-container 右上角絕對定位）
│   ├── WorkflowSection/    # 合作流程區塊（Content Collection）
│   └── ...
├── content/
│   ├── about/              # 關於我（單一 md）
│   ├── articles/           # 文章列表（order, title, image, url）
│   ├── experience/         # 工作經歷（order, date, title, company, tags, links）
│   ├── projects/           # 專案作品（order, title, image, url, tags, stats）
│   ├── services/           # 服務項目（order, title, icon, tags）
│   └── workflow/           # 合作流程步驟（order, title, icon + body）
├── content.config.ts       # 各 collection 的 Zod schema
├── consts.ts               # SITE_TITLE, SITE_DESCRIPTION, SITE_URL, IMAGE_FALLBACK_PATH
├── layouts/
│   └── BaseLayout.astro    # HTML 殼、平滑捲動、scroll-spy、JSON-LD 注入
├── pages/
│   └── index.astro         # 首頁（組裝各 Section）
└── styles/
    ├── global.scss         # 全域變數、skip-link、focus 樣式
    └── variables.scss      # SCSS 變數（若未使用可忽略）
```

---

## 4. 功能摘要

- **首頁**：單頁多區塊，錨點為 about / experience / projects / articles / services / workflow。
- **導航**：側欄 NavigationLinks（桌面）+ Footer 底導航（手機）；點擊錨點由 GSAP 平滑捲動。
- **Scroll-Spy**：BaseLayout 內 Intersection Observer，依視窗區塊為對應導航項加上 `is-active` 樣式。
- **主題**：深/淺色切換，`data-theme` + localStorage，BaseHead 內 theme-color、inline 主題腳本。
- **SEO 基礎**：BaseHead 提供 title、description、canonical、OG、Twitter、theme-color；首頁注入 Person 結構化資料；sitemap、RSS 整合。
- **內容來源**：about / experience / projects / articles 為既有區塊；services、workflow 由 Content Collection 驅動，便於之後依接案狀態調整。

---

## 5. 已知待辦（高層級）

- **consts.ts**：SITE_TITLE、SITE_DESCRIPTION、SITE_URL 仍為 placeholder，需改為實際站點資訊。
- **astro.config.mjs**：`site: "https://example.com"` 需改為正式網址。
- **SEO / AEO / GEO**：更細項的改進與優化清單見專案根目錄 **TODO.md**。

---

## 6. 檔案與職責對照

| 檔案／目錄 | 職責 |
|------------|------|
| `src/consts.ts` | 站點標題、描述、網址、圖片 fallback 路徑 |
| `src/content.config.ts` | about, experience, projects, articles, services, workflow 的 schema |
| `src/components/BaseHead/index.astro` | 全域 meta、OG、Twitter、theme-color、主題初始化 |
| `src/layouts/BaseLayout.astro` | 平滑捲動、scroll-spy、JSON-LD 插槽、skip-link、CursorShadow |
| `src/pages/index.astro` | 拉取各 collection、組裝 Person schema、渲染各 Section |
| `public/placeholder.svg` | 圖片載入失敗時 fallback |
| `public/robots.txt` | 爬蟲規則與 Sitemap 指向；上線前請將 Sitemap URL 改為正式網址 |
| （建置產出） | Sitemap 由 `@astrojs/sitemap` 於建置時自動產出 `sitemap-index.xml` |

---

*本文件不保留過往修正紀錄，僅描述當下專案狀態。後續改動請同步更新此文件與 TODO.md。*
