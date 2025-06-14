---
title: 生活隨筆
date: 2025-06-01
---

# 生活隨筆

這裡是我分享生活點滴的地方，包含旅行、學習心得和日常隨想。希望這些文章能帶給您一些靈感或共鳴！

## 文章列表

<script setup lang="ts">
import { data as posts } from '../../.vitepress/data/lifestyle.data';
</script>

<ul>
  <li v-for="post in posts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a> - {{ post.date }}
    <p v-if="post.description">{{ post.description }}</p>
  </li>
  <li v-if="!posts.length">暫無生活隨筆文章，請稍後查看！</li>
</ul>

## 為什麼寫生活隨筆？

生活就像一本書，每天的經歷都是獨特的故事。透過記錄這些隨筆，我希望能記住美好的時刻，並與讀者分享生活的點滴。如果您也有故事想分享，歡迎留言！

---

_最後更新於 {{ $frontmatter.date }}_
