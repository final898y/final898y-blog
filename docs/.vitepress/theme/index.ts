// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Comments from "./Comments.vue";
import Tags from "./Tags.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "doc-before": () => h(Tags),
      "doc-after": () => h(Comments),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Comments", Comments);
    app.component("Tags", Tags);
  },
} satisfies Theme;
