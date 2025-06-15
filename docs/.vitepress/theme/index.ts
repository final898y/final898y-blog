// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Comments from "./Comments.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "doc-after": () => h(Comments),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Comments", Comments);
  },
} satisfies Theme;
