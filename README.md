# Jett Portfolio

以 **Astro** 建置的個人作品集／接案展示站，單頁式架構，強調 **SEO / AEO / GEO** 友善。用於呈現經歷、專案、文章、服務項目與合作流程。

## 特色

- **靜態生成 (SSG)**：Astro 輸出靜態 HTML，載入輕量、利於搜尋與效能。
- **內容集中管理**：透過 Content Collections 管理「關於我」、「經歷」、「專案」、「文章」、「服務」、「合作流程」，型別安全（Zod schema）。
- **閱讀與體驗**：
  - 響應式佈局，桌面側欄導航 + 手機底部導航，錨點平滑捲動（GSAP）。
  - SEO 基礎完備：JSON-LD Person、meta、OG、canonical、sitemap、RSS。
  - 深色／淺色主題、游標效果與微互動。
- **技術棧**：TypeScript、SCSS、Lucide Icons、GSAP。

## 技術棧

- **框架**: [Astro v5](https://astro.build/)
- **樣式**: SCSS/SASS、[modern-normalize](https://github.com/sindresorhus/modern-normalize)
- **圖標**: [Lucide Icons](https://lucide.dev/)（透過 `astro-icon`）
- **動畫**: [GSAP](https://greensock.com/gsap/)（含 ScrollToPlugin）
- **圖片**: Sharp（Astro 內建優化）
- **套件管理**: pnpm

## 專案結構

```text
src/
├── components/       # UI 元件
│   ├── AboutSection/       # 關於我
│   ├── ArticlesSection/ + ArticleCard/
│   ├── BaseHead/           # 全域 meta、OG、theme-color
│   ├── CursorShadow/       # 游標效果
│   ├── ExperienceSection/ + ExperienceCard/
│   ├── Footer/             # 底導航 + ThemeToggle
│   ├── NavigationLinks/    # 側欄導航（含 scroll-spy）
│   ├── ProjectsSection/ + ProjectCard/
│   ├── ServicesSection/    # 服務區塊（Content 驅動）
│   ├── ThemeToggle/        # 深色模式
│   └── WorkflowSection/    # 合作流程（Content 驅動）
├── content/          # 內容來源 (Markdown)
│   ├── about/        # 自我介紹（單一 index.md）
│   ├── experience/   # 工作經歷
│   ├── projects/     # 專案作品
│   ├── articles/     # 技術文章
│   ├── services/     # 服務項目
│   └── workflow/     # 合作流程步驟
├── content.config.ts # 各 collection 的 schema 定義
├── consts.ts         # SITE_TITLE、SITE_DESCRIPTION、SITE_URL 等
├── layouts/          # BaseLayout（平滑捲動、scroll-spy、JSON-LD）
├── pages/            # index.astro 為首頁
└── styles/           # 全域樣式
```

## 快速開始

建議使用 **Node.js LTS**。

### 安裝依賴

```bash
pnpm install
```

### 開發

```bash
pnpm dev
```

開啟 `http://localhost:4321` 預覽。

### 建置與預覽

```bash
pnpm build
pnpm preview
```

產出在 `dist/`，可部署至 Vercel、Netlify、GitHub Pages 等靜態託管。

## 內容編輯

- **關於我**：編輯 `src/content/about/index.md`。
- **工作經歷**：在 `src/content/experience/` 新增 Markdown，依 schema 填寫 `order`、`date`、`title`、`company`、`tags` 等。
- **專案**：在 `src/content/projects/` 管理，支援 `image`、`url`、`tags`、`stats`。
- **文章**：在 `src/content/articles/` 新增，需 `order`、`title`、`image`、`url`。
- **服務**：在 `src/content/services/` 新增，需 `title`、`order`、`icon`（Lucide 名稱）、`tags`。
- **合作流程**：在 `src/content/workflow/` 新增步驟，需 `title`、`order`、`icon`，內文為 Markdown。

站點標題、描述與網址請在 **`src/consts.ts`** 設定；正式上線前請同步修改 **`astro.config.mjs`** 的 `site` 為實際網址。更多 SEO/AEO/GEO 待辦見 **TODO.md**，專案現況見 **CURRENT_STATUS.md**。

---

Built with ❤️ by Jett
