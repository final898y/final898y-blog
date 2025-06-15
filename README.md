# Final898y's Blog

歡迎來到我的個人博客倉庫！這是一個使用 **VitePress** 建置的靜態網站，部署於 **GitHub Pages** 的子目錄 `https://final898y.github.io/blog/`，作為 `final898y/final898y.github.io` 網站的一部分。本專案獨立管理博客內容，分享技術文章、程式設計筆記與生活隨筆，並整合 **Giscus** 留言系統，讓讀者可以互動。

本文件詳細說明專案結構、技術棧、開發流程、部署方式與留言功能，適合初學者閱讀與操作。

---

## 🚀 技術棧

以下是本專案使用的核心技術：

| 技術               | 說明                                                  |
| ------------------ | ----------------------------------------------------- |
| **VitePress**      | 基於 Vue 的靜態網站生成工具，適合撰寫技術文件與博客。 |
| **TypeScript**     | 提供型別安全，用於動態載入文章資料。                  |
| **GitHub Pages**   | 免費的靜態網站託管服務，部署最終網站。                |
| **GitHub Actions** | 自動化流程，完成建置與部署。                          |
| **Node.js 20**     | 執行環境，支援專案開發與建置。                        |
| **Giscus**         | 基於 GitHub Discussions 的留言系統。                  |

> **名詞解釋**：
>
> - **靜態網站**：預生成 HTML 文件，無需伺服器動態計算，載入速度快。
> - **TypeScript**：JavaScript 的超集合，增加型別檢查，減少錯誤。
> - **Giscus**：使用 GitHub Discussions 儲存留言，無需額外伺服器。

---

## 📁 專案結構

以下是專案的檔案結構：

```
blog/
├── docs/
│   ├── .vitepress/
│   │   ├── data/
│   │   │   ├── posts.data.ts        # 首頁文章列表的資料載入器
│   │   │   ├── programming.data.ts  # 程式設計分類頁面的資料載入器
│   │   │   └── lifestyle.data.ts    # 生活隨筆分類頁面的資料載入器
│   │   ├── theme/
│   │   │   ├── Comments.vue         # Giscus 留言元件
│   │   │   ├── index.ts            # 自訂主題，註冊留言元件
│   │   │   └── style.css           # 自訂樣式
│   │   └── config.ts               # VitePress 配置文件
│   ├── articles/
│   │   ├── my-first-programming-post.md  # 程式設計文章
│   │   ├── my-learning-journey.md        # 生活隨筆文章
│   │   └── category/
│   │       ├── programming.md       # 程式設計分類頁面
│   │       └── lifestyle.md         # 生活隨筆分類頁面
│   └── index.md                     # 首頁
├── dist/                            # 打包後的靜態檔案
├── package.json                     # NPM 套件與指令配置
├── tsconfig.json                    # TypeScript 配置
├── LICENSE.md                       # MIT License
└── README.md                        # 本文件
```

### 結構說明

- **`docs/`**：VitePress 文件根目錄，存放文章與配置。
- **`.vitepress/data/`**：動態載入文章資料，生成文章列表。
  > **比喻**：像圖書館的書目索引，自動整理文章資訊。
- **`.vitepress/theme/`**：自訂主題，包含 Giscus 留言元件。
- **`articles/`**：Markdown 文章，按標籤分類。
- **`index.md`**：首頁，展示最新文章與分類連結。
- **`dist/`**：建置後的靜態檔案，部署至 GitHub Pages。
- **`LICENSE.md`**：MIT 授權，允許自由使用程式碼。

---

## ⚙️ 開發與建置

### 環境設置

需安裝 **Node.js 20**。常用指令如下：

```bash
# 安裝相依套件
npm install

# 啟動本地開發伺服器
npm run docs:dev

# 建置靜態檔案
npm run docs:build

# 預覽建置結果
npm run docs:preview
```

### 指令說明

- **`npm install`**：下載 VitePress 等套件。
- **`npm run docs:dev`**：啟動伺服器，預覽於 `http://localhost:5173/blog/`。
- **`npm run docs:build`**：生成靜態檔案至 `dist/`。
- **`npm run docs:preview`**：模擬線上環境，預覽於 `http://localhost:4173/blog/`。

> **最佳實務**：修改 `package.json` 後，重新執行 `npm install`。

---

## 🚀 自動部署

推送至 `main` 分支時，GitHub Actions 會：

1. 執行 `npm run docs:build`，生成 `dist/`。
2. 使用 `peaceiris/actions-gh-pages@v4` 將 `dist/` 推送至 `final898y/final898y.github.io` 的 `gh-pages` 分支的 `/blog/` 目錄。
3. 網站更新至：🔗 [https://final898y.github.io/blog/](https://final898y.github.io/blog/)

### 注意事項

- 確保 `.vitepress/config.ts` 設置：
  ```typescript
  export default {
    base: "/blog/",
    outDir: "dist",
  };
  ```
- 檢查 `.github/workflows/deploy.yml`，確保部署正確。

---

## 📝 添加新文章

1. 在 `docs/articles/` 新增 Markdown 檔案：

   ```markdown
   ---
   title: 學習 JavaScript 基礎技巧
   date: 2025-06-20
   tags: [程式設計, JavaScript]
   description: 介紹 JavaScript 基礎。
   comments: true
   ---

   # 學習 JavaScript 基礎技巧

   這是一篇入門文章，涵蓋變數與函數。
   ```

2. 執行 `npm run docs:dev` 預覽。
3. 提交並推送：
   ```bash
   git add docs/articles/new-article.md
   git commit -m "Add new JavaScript article"
   git push origin main
   ```

> **最佳實務**：使用 `comments: false` 禁用特定頁面留言，例如首頁：
>
> ```markdown
> ---
> title: 首頁
> comments: false
> ---
> ```

---

## 💬 留言系統（Giscus）

本博客整合 **Giscus**，基於 `final898y-blog-comments` 的 GitHub Discussions，提供留言功能。讀者可使用 GitHub 帳號留言，支援反應（Reactions）與繁體中文介面。

### 配置步驟

1. 在 `final898y-blog-comments` 啟用 Discussions：
   - 前往「Settings」>「Features」，勾選「Discussions」。
   - 創建「Blog Comments」類別。
2. 在 [https://giscus.app/](https://giscus.app/) 配置：
   - **Repository**: `final898y-blog-comments`
   - **Mapping**: `pathname`
   - **Category**: `Blog Comments`
   - **Theme**: `transparent_dark`
   - **Language**: `zh-TW`
   - 啟用「Reactions」與「Lazy loading」。
3. 更新 `docs/.vitepress/theme/Comments.vue` 的 `data-repo-id` 和 `data-category-id`（從 Giscus 配置取得）。
4. 留言區自動顯示於文章頁面（除非設置 `comments: false`）。

### 問題排查

- **留言區未顯示**：
  - 檢查 `Comments.vue` 的 `data-repo-id` 和 `data-category-id` 是否正確。
  - 確認 `final898y/blog` 的 Discussions 已啟用。
  - 打開瀏覽器開發者工具（F12 > Console），檢查錯誤（如 CORS 或腳本載入失敗）。
- **路徑錯誤**：
  - 確保 `config.ts` 的 `base: '/blog/'` 與 `Comments.vue` 的 `data-mapping="pathname"`。
- **部署問題**：
  - 清空快取並重新建置：
    ```bash
    rm -rf docs/.vitepress/cache dist/
    npm run docs:build
    ```
  - 檢查 GitHub Actions 日誌，確認 `dist/` 部署至 `gh-pages` 的 `/blog/` 目錄。
- **留言不更新**：
  - 確認 `Comments.vue` 使用 `:key="route.path"`，確保路由變化時重新載入。

> **比喻**：Giscus 像一個公開留言板，若地址（ID）或房間（類別）錯誤，留言框就不會出現。

---

## 🛠️ 問題排查（其他）

- **博客 404**：
  - 檢查 `final898y/final898y.github.io` 的 `gh-pages` 分支，確保 `/blog/index.html` 存在。
  - 檢視 GitHub Actions 日誌，確認部署成功。
- **建置失敗**：
  - 清空快取並重新建置：
    ```bash
    rm -rf docs/.vitepress/cache dist/
    npm run docs:build
    ```
- **Deploy Key 無效**：
  - 在 `final898y/blog` 的「Settings > Actions > Secrets」，確認 `DEPLOY_KEY`。
  - 在 `final898y/final898y.github.io` 的「Settings > Deploy keys」，確認「Blog Deploy Key」。

---

## 🧭 未來規劃

- [x] 整合 Giscus 留言系統。
- [ ] 添加搜尋功能（VitePress 內建或 Algolia）。
- [ ] 實現分頁功能，支援大量文章。
- [ ] 加入 Jest、Prettier、ESLint，提升程式碼質量。

---

## 🙌 參與與回饋

歡迎提交 **Issues** 或 **Pull Requests**！問題請在 [GitHub Issues](https://github.com/final898y/blog/issues) 提出。感謝支持！🙏

---

## 📄 授權條款

本專案採用 **MIT License**，詳見 [LICENSE.md](./LICENSE.md)。
