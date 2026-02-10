/** @type {import("prettier").Config} */
export default {
  // 基礎設定
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  
  // 插件設定：這是處理 Astro 檔案的關鍵
  plugins: ['prettier-plugin-astro'],
  
  // Astro 專屬配置
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};