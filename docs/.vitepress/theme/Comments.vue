<script setup lang="ts">
import { useData, useRoute } from "vitepress";
const { title, frontmatter } = useData();
const route = useRoute();

// 動態主題，根據 VitePress 主題切換
const theme = frontmatter.value.theme === "dark" ? "dark" : "transparent_dark";
</script>

<template>
  <!-- 僅在啟用留言的頁面顯示 -->
  <div
    v-if="frontmatter.comments !== false"
    :key="route.path"
    class="giscus-container"
  >
    <h2>留言</h2>
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="final898y/final898y-blog-comments"
      data-repo-id="R_kgDOO78UoQ"
      data-category="Blog Comments"
      data-category-id="DIC_kwDOO78Uoc4CrhhH"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="dark_tritanopia"
      data-lang="zh-TW"
      data-loading="lazy"
      crossorigin="anonymous"
      async
    />
  </div>
</template>

<style scoped>
.giscus-container {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
