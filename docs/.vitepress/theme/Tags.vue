<template>
  <div v-if="tags.length" class="tags-container">
    <span v-for="tag in tags" :key="tag" class="tag-item">
      #{{ tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData();

const tags = computed(() => {
  return frontmatter.value.tags || [];
});
</script>

<style scoped>
.tags-container {
  margin-top: 1rem;
}

.tag-item {
  display: inline-block;
  background-color: var(--vp-c-mute);
  color: var(--vp-c-text-1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}
</style>
