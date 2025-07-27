---
title: 我的第一篇程式設計文章
date: 2025-06-01
tags: [程式設計, VitePress, 初學者]
description: 範例教學。
---

# 我的第一篇程式設計文章

## 前言

這是我的第一篇博客文章，分享我在學習 VitePress 時的一些心得。希望能幫助其他初學者快速上手！

## 為什麼選擇 VitePress？

VitePress 是一個輕量且強大的靜態網站生成器，適合用來搭建個人博客。它基於 Vue.js，支援 Markdown 撰寫文章，並提供快速的開發體驗。

### 步驟一：初始化專案

```bash
npm init vitepress
```

這段指令會初始化一個 VitePress 專案，包含預設的配置文件和範例頁面。

### 步驟二：撰寫文章

在 `docs/articles/` 資料夾中創建 Markdown 檔案，例如本篇文章。記得在檔案開頭添加元數據：

```yaml
---
title: 文章標題
date: 2025-06-01
tags: [標籤1, 標籤2]
---
```

## 結語

透過 VitePress，我學會了如何快速搭建一個博客網站。希望這篇文章對你有幫助！如果有任何問題，歡迎留言或聯繫我。

---

_最後更新於 {{ $frontmatter.date }}_
