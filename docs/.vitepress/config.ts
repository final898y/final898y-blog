import { defineConfig } from "vitepress";

// 網站基本配置，定義標題、描述和基礎路徑
export default defineConfig({
  title: "Final898yBlog", // 網站標題，顯示在瀏覽器標籤和首頁
  description: "我的個人博客，分享程式設計與生活點滴", // 網站描述，用於 SEO 和網站介紹
  base: "/blog/", // 基礎路徑，確保部署到子目錄時正常運行
  themeConfig: {
    // 導航欄配置，定義網站頂部的選單
    nav: [
      { text: "首頁", link: "/" }, // 首頁連結
      { text: "文章", link: "/articles/" }, // 文章列表頁面
      { text: "關於我", link: "/about" }, // 關於我頁面
    ],

    // 側邊欄配置，為文章頁面提供結構化的導航
    sidebar: {
      "/articles/": [
        // 當訪問 /articles/ 路徑時顯示的側邊欄
        {
          text: "文章分類",
          items: [
            { text: "所有文章", link: "/articles/" }, // 文章總覽
            { text: "程式設計", link: "/articles/category/programming" }, // 程式設計分類
            { text: "生活隨筆", link: "/articles/category/lifestyle" }, // 生活隨筆分類
          ],
        },
      ],
      "/about/": [
        // 當訪問 /about 路徑時顯示的側邊欄
        {
          text: "關於",
          items: [
            { text: "關於我", link: "/about" }, // 關於我頁面
          ],
        },
      ],
    },

    // 社交連結，顯示在側邊欄或頁腳
    socialLinks: [
      { icon: "github", link: "https://github.com/final898y" }, // 替換為您的 GitHub 連結
      { icon: "twitter", link: "https://twitter.com/your-username" }, // 替換為您的 Twitter 連結
    ],

    // 啟用文章元數據相關功能
    lastUpdated: {
      text: "Updated at",
      formatOptions: { dateStyle: "full", timeStyle: "medium" },
    },
    editLink: {
      pattern:
        "https://github.com/final898y/final898y-blog/edit/main/docs/:path", // 編輯連結，指向 GitHub 儲存庫
      text: "在 GitHub 上編輯此頁",
    },
    search: {
      provider: "local", // 啟用本地搜尋功能，方便讀者查找文章
    },
  },
  lastUpdated: true, // 顯示文章最後更新時間

  // Markdown 配置，增強文章撰寫體驗
  markdown: {
    lineNumbers: true, // 在程式碼區塊顯示行號
  },
});
