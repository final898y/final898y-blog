---
layout: home

hero:
  name: Final898y's Blog
  text: 程式與生活的隨筆
  tagline: 分享技術學習與生活點滴，記錄成長的每一步
  image:
    src: /hero-background.webp
    alt: Blog Hero Image
  actions:
    - theme: brand
      text: 探索技術文章
      link: /articles/category/programming
    - theme: alt
      text: 閱讀生活隨筆
      link: /articles/category/lifestyle
    - theme: alt
      text: 關於我
      link: /about

features:
  - title: 技術分享
    details: 深入淺出的程式設計教程，涵蓋前端開發、VitePress 建站與 GitHub 使用技巧，適合初學者。
    icon: 💻
  - title: 生活記錄
    details: 記錄學習心得、旅遊故事與日常感悟，分享生活的美好與挑戰。
    icon: 📝
  - title: 互動交流
    details: 透過 Giscus 留言系統，與讀者交流想法，共同學習與成長。
    icon: 💬
---

## 最新文章

<script setup lang="ts">
import { data as posts } from './.vitepress/data/posts.data';

// 為每篇文章動態生成卡片所需的資料
const features = posts.map(post => ({
  title: post.title,
  details: post.description || '暫無描述', // 使用 description，若無則顯示預設文字
  link: post.url, // 點擊卡片導向文章
  icon: '📄', // 預設圖標，可根據需要自訂（例如根據分類選擇圖標）
  date: post.date // 添加日期顯示
}));
</script>

<div v-if="features.length" class="features-container">
  <div
    v-for="feature in features"
    :key="feature.link"
    class="feature-card"
  >
    <span class="feature-icon">{{ feature.icon }}</span>
    <h3><a :href="feature.link">{{ feature.title }}</a></h3>
    <p>{{ feature.details }} - {{ feature.date }}</p>
  </div>
</div>
<div v-else class="no-posts">
  暫無文章，請稍後查看！
</div>

**提示**：點擊導航列的「Programming」或「Lifestyle」，探索更多分類文章！

<style>
/* 自訂樣式，確保卡片佈局與 features 一致 */
.features-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: left;
  margin-top: 2rem;
}

.feature-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.feature-card h3 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.feature-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* 當無文章時的提示樣式 */
.no-posts {
  text-align: center;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin-top: 2rem;
}
</style>
