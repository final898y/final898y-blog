---
title: 我的博客
comments: false
---

# 文章總覽

歡迎來到我的博客！這裡列出了所有文章，您可以按分類瀏覽或使用搜尋功能查找感興趣的內容。

## 最新文章

<script setup lang="ts">
import { data as posts } from '../.vitepress/data/posts.data';

// 除錯：輸出載入的文章數據
// console.log('All posts:', posts);
</script>

<ul>
  <li v-for="post in posts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a> - {{ post.date }}
    <p v-if="post.description">{{ post.description }}</p>
  </li>
  <li v-if="!posts.length">暫無文章，請稍後查看！</li>
</ul>

## 分類

- [程式設計](/articles/category/programming)
- [生活隨筆](/articles/category/lifestyle)
