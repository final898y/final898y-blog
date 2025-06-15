---
title: 程式設計文章
date: 2025-06-01
comments: false
---

# 程式設計文章

這裡是所有關於程式設計的文章集合，涵蓋 VitePress、JavaScript、CSS 等主題。這些文章適合初學者，幫助您快速掌握程式設計基礎。

## 文章列表

<script setup lang="ts">
import { data as posts } from '../../.vitepress/data/programming.data';
</script>

<ul>
  <li v-for="post in posts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a> - {{ post.date }}
    <p v-if="post.description">{{ post.description }}</p>
  </li>
  <li v-if="!posts.length">暫無程式設計文章，請稍後查看！</li>
</ul>

## 為什麼學習程式設計？

程式設計就像學習如何與電腦對話！透過撰寫程式碼，您可以創建網站、應用程式，甚至解決日常生活中的問題。這些文章將一步步引導您，從基礎到進階，逐步提升技能。

如果您有任何問題或想看特定主題的文章，歡迎留言或聯繫我！

---

_最後更新於 {{ $frontmatter.date }}_
