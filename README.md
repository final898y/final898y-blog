# final898y-blog

這是一個使用 VitePress 建立的個人博客，部署於 GitHub Pages 的子目錄 `/blog/`。  
本倉庫獨立於主站（`final898y/final898y.github.io`），負責博客內容的管理與部署。

---

## 🚀 技術棧

| 技術           | 說明                         |
| -------------- | ---------------------------- |
| VitePress      | 用於撰寫與產生靜態網站的工具 |
| TypeScript     | 提供型別安全的資料載入器     |
| GitHub Pages   | 免費靜態網站託管服務         |
| GitHub Actions | 自動部署流程（CI/CD）        |
| Node.js 20     | 開發與部署的執行環境         |

---

## 📁 專案結構

```
blog/
├── docs/
│   ├── .vitepress/
│   │   ├── data/
│   │   │   ├── posts.data.ts        # 首頁文章列表的資料載入器
│   │   │   ├── programming.data.ts  # 程式設計分類頁面的資料載入器
│   │   │   └── lifestyle.data.ts    # 生活隨筆分類頁面的資料載入器
│   │   └── config.ts               # VitePress 配置文件
│   ├── articles/
│   │   ├── my-first-programming-post.md  # 程式設計文章
│   │   ├── my-learning-journey.md        # 生活隨筆文章
│   │   └── category/
│   │       ├── programming.md       # 程式設計分類頁面
│   │       └── lifestyle.md         # 生活隨筆分類頁面
│   └── index.md                     # 首頁
├── dist/                            # 打包後的靜態檔案
├── package.json                     # NPM 套件與指令
├── tsconfig.json                    # TypeScript 配置
├── LICENSE.md                       # MIT License
└── README.md                        # 本文件
```

### 結構說明

- **`docs/`**：VitePress 文件根目錄，包含文章和配置。
- **`.vitepress/data/`**：動態載入文章的 TypeScript 檔案。
- **`articles/`**：Markdown 文章檔案，按標籤分類。
- **`index.md`**：首頁，展示最新文章和分類連結。
- **`LICENSE.md`**：MIT License 授權檔案。

---

## ⚙️ 開發與建置

```bash
# 安裝相依套件
npm install

# 本地預覽
npm run docs:dev

# 建置靜態檔案
npm run docs:build

# 預覽建置結果
npm run docs:preview
```

---

## 🚀 自動部署（GitHub Actions）

推送至 `main` 分支時，GitHub Actions 會：

1. 安裝依賴並執行 `npm run docs:build`。
2. 將 `dist/` 內容部署至 `final898y/final898y.github.io` 的 `/blog/` 子目錄。
3. 網站更新至：  
   🔗 [https://final898y.github.io/blog/](https://final898y.github.io/blog/)

---

## 📚 添加新文章

1. 在 `docs/articles/` 新增 Markdown 檔案：

```yaml
---
title: 新程式設計文章
date: 2025-06-02
tags: [程式設計, JavaScript]
description: 學習 JavaScript 的基礎技巧。
---
# 新程式設計文章
```

2. 執行 `npm run docs:dev` 預覽。
3. 推送至 `main` 分支，自動部署。

---

## 🧭 未來規劃

- [ ] 整合留言系統（如 Giscus）。
- [ ] 添加搜尋功能（VitePress 內建或 Algolia）。
- [ ] 實現分頁功能，支援大量文章。
- [ ] 加入測試與格式化工具（Jest、Prettier、ESLint）。

---

## 🙌 貢獻與回饋

歡迎提交 Issues 或 Pull Requests！🙏

---

## 📄 授權條款

本專案採用 MIT License，詳見 [LICENSE.md](./LICENSE.md)。

```

```
