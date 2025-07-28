---
title: 在 VitePress 中自訂 URL
date: 2025-07-27
tags: [程式設計, VitePress]
description: VitePress 中自訂 URL
---

# 在 VitePress 中自訂 URL

VitePress 預設會根據檔案路徑產生 URL。例如，一個位於 `docs/articles/my-post.md` 的檔案，其 URL 會是 `/articles/my-post.html`。

然而，有時候我們希望 URL 結構更具可讀性或更符合專案需求，例如將 URL 設定為 `/posts/my-post/`。VitePress 提供了兩種主要的方式來實現這個目標：

1.  **使用 `permalink`**：在每個 Markdown 檔案的 frontmatter 中單獨設定 URL。
2.  **使用 `glob` 和 `transformPageData`**：在 VitePress 的設定檔中，透過程式碼動態地為所有文章產生 URL。

## 方法一：使用 `permalink`

`permalink` 是一個可以在 Markdown 檔案的 frontmatter 中設定的屬性，用來覆寫預設的 URL。

### 使用方法

在 Markdown 檔案的 frontmatter 中，加入 `permalink` 屬性並指定你想要的 URL 路徑。

**範例：**

假設你的檔案結構如下：

```
docs/
├── articles/
│   └── my-first-post.md
└── index.md
```

若要將 `my-first-post.md` 的 URL 設定為 `/blog/my-first-post/`，你可以在該檔案的 frontmatter 中這樣設定：

```yaml
---
title: My First Post
date: 2023-10-27
permalink: /blog/my-first-post/
---
這是我的第一篇文章。
```

### 優點

- **簡單直觀**：對於單一檔案或少量檔案，設定非常簡單。
- **靈活性高**：可以為每個檔案設定完全不同的 URL 結構。

### 缺點

- **重複性高**：如果有很多文章，需要在每個檔案中手動加入 `permalink`，容易出錯且不易維護。

## 方法二：使用 `transformPageData`

`transformPageData` 是 VitePress 提供的一個鉤子（hook），它允許你在 VitePress 處理每個 Markdown 檔案時，動態地修改該頁面的資料，包括 `frontmatter`。

### 使用方法

在 `.vitepress/config.ts` 設定檔中，你可以透過 `transformPageData` 函數來動態產生 `permalink`。

**範例：**

假設你的檔案結構如下：

```
docs/
├── articles/
│   ├── 2023/
│   │   └── my-first-post.md
│   └── 2024/
│       └── my-second-post.md
└── .vitepress/
    └── config.ts
```

你可以在 `.vitepress/config.ts` 中這樣設定：

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  // ... 其他設定 ...

  transformPageData(pageData) {
    // 只處理 articles 資料夾下的 Markdown 檔案
    if (pageData.filePath.startsWith("articles/")) {
      const permalink = pageData.filePath
        .replace(/^articles\//, "")
        .replace(/\.md$/, "");

      pageData.frontmatter.permalink = `/posts/${permalink}/`;
    }
    return pageData;
  },

  // ... 其他設定 ...
});
```

### 運作原理

1.  **`transformPageData(pageData)`**：這個函數會對每個頁面（Markdown 檔案）執行一次。
2.  **`pageData.filePath`**：包含了從專案根目錄開始的相對路徑，例如 `articles/2023/my-first-post.md`。
3.  **`pageData.frontmatter`**：是一個物件，包含了該頁面的 frontmatter 資料。
4.  **邏輯**：
    - 我們首先檢查 `pageData.filePath` 是否以 `articles/` 開頭，以確保只處理文章檔案。
    - 然後，我們從 `pageData.filePath` 中移除 `articles/` 前綴和 `.md` 後綴，以得到一個乾淨的路徑。
    - 最後，我們將這個乾淨的路徑加上 `/posts/` 前綴，並將其賦值給 `pageData.frontmatter.permalink`。

### 優點

- **集中管理**：所有 URL 的邏輯都在一個地方，方便維護和修改。
- **自動化**：不需要手動加入 `permalink`，減少了人為錯誤。
- **擴展性高**：可以根據需要加入更複雜的邏輯，例如根據檔案夾結構產生不同的 URL。

### 缺點

- **需要理解程式碼**：相較於直接在 frontmatter 中設定，需要一些程式碼知識。

## 結論

- 如果你的專案中只有少量的頁面需要自訂 URL，使用 **`permalink`** 是一個快速簡單的解決方案。
- 如果你的專案中有很多文章，或者你希望有一個統一的 URL 結構，建議使用 **`transformPageData`** 來自動化這個過程，這樣會更有效率且更容易維護。
