# Jett Portfolio

這是一個基於 **Astro** 構建的高效能個人作品集網站，旨在展示個人經歷、專案作品與技術文章。透過極簡的設計與流暢的體驗，呈現專業的 Frontend Engineer 形象。

## ✨ 特色

- **極速效能**：利用 Astro 的靜態生成 (SSG) 架構，確保網頁載入輕量且快速。
- **結構化內容管理**：透過 Astro Content Collections (`src/content/`) 輕鬆維護「關於我」、「工作經歷」、「專案作品」與「文章」。
- **優化閱讀體驗**：
  - **響應式設計**：針對桌面與行動裝置優化的佈局，包含手機版黏性導航與平滑滾動。
  - **SEO 友善**：內建 JSON-LD 結構化資料 (`Person` Schema) 與語意化 HTML 標籤。
  - **互動細節**：整合 `CursorShadow` 游標效果與細緻的微互動動畫。
- **現代化開發棧**：採用 TypeScript、SCSS/SASS 進行開發，確保程式碼的可維護性與擴充性。

## �️ 技術棧

- **核心框架**: [Astro v5](https://astro.build/)
- **樣式預處理**: SCSS / SASS (`modern-normalize` 重置樣式)
- **圖標系統**: [Lucide Icons](https://lucide.dev/) (via `astro-icon`)
- **動畫效果**: GSAP
- **圖片處理**: Sharp (via Astro image optimization)
- **套件管理**: pnpm

## 📂 專案結構

```text
src/
├── components/       # UI 元件 (ThemeToggle, Footer, CursorShadow 等)
├── content/          # 網站內容來源 (Markdown/MDX)
│   ├── about/        # 自我介紹內容
│   ├── experience/   # 工作經歷列表
│   ├── projects/     # 專案作品集
│   └── articles/     # 技術文章列表
├── content.config.ts # 定義資料結構 Schema (Type-safe content)
├── layouts/          # 頁面佈局 (BaseLayout)
├── pages/            # 路由頁面 (index.astro 為首頁入口)
├── styles/           # 全域樣式設定
└── consts.ts         # 網站全域常數定義
```

## 🚀 快速開始

請確保您的環境已安裝 Node.js (lts 24)。

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 啟動開發伺服器

```bash
pnpm dev
```

瀏覽器打開 `http://localhost:4321` 即可進行即時預覽。

### 3. 建置生產版本

```bash
pnpm build
```

建置後的靜態檔案將輸出至 `dist/` 目錄，可部署至任何靜態託管服務 (如 Vercel, Netlify, Github Pages)。

## 📝 內容編輯

本專案的所有文案內容皆採用 Markdown 管理，位於 `src/content/` 目錄下的對應資料夾中。

- **修改個人介紹**: 編輯 `src/content/about/index.md`。
- **新增工作經歷**: 在 `src/content/experience/` 建立新的 Markdown 檔案，並依照 schema 填寫 metadata (日期、職稱、公司連結等)。
- **更新專案作品**: 在 `src/content/projects/` 管理作品集，支援圖片與標籤設定。
- **發布文章**: 在 `src/content/articles/` 新增文章內容。

若需調整網站標題或描述，請修改 `src/consts.ts` 檔案。

---

Built with ❤️ by Jett
