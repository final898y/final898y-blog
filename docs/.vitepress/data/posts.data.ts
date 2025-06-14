import { createContentLoader } from "vitepress";

// 定義輸出的資料型別
interface PostData {
  url: string;
  title: string;
  date: string;
  description: string;
  excerpt: string;
}

const BASE = "/blog";

// 日期格式化函數：將 ISO 日期轉為 YYYY年MM月DD日
function formatDate(isoDate: string | undefined): string {
  if (!isoDate) return "無日期";
  const date = new Date(isoDate);
  // 檢查日期是否有效
  if (isNaN(date.getTime())) return "無日期";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份從 0 開始，需 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}年${month}月${day}日`;
}

// 定義資料載入器
export default createContentLoader("articles/*.md", {
  // 啟用摘錄（第一個 --- 上方的內容）
  excerpt: true,
  // 自訂資料轉換
  transform(rawData): PostData[] {
    // 除錯：輸出原始數據
    //console.log("Raw posts data:", rawData);

    return rawData
      .filter(
        (page) =>
          // 確保 frontmatter 存在，且路徑以 /articles/ 開頭，
          // 排除分類頁面和 index.md（/articles/）
          page.frontmatter &&
          page.url.startsWith("/articles/") &&
          !page.url.includes("/category/") &&
          page.url !== "/articles/"
      )
      .sort((a, b) => {
        // 按日期降序排序（最新文章優先）
        const dateA = a.frontmatter.date
          ? new Date(a.frontmatter.date)
          : new Date(0);
        const dateB = b.frontmatter.date
          ? new Date(b.frontmatter.date)
          : new Date(0);
        return dateB.getTime() - dateA.getTime();
      })
      .map((page) => ({
        url: `${BASE}${page.url}`, // 添加 /blog/ 前綴
        title: page.frontmatter.title || "未命名文章",
        date: formatDate(page.frontmatter.date), // 格式化日期
        description: page.frontmatter.description || "",
        excerpt: page.excerpt || "",
      }));
  },
});

// 導出型別以便在 .md 檔案中使用
export interface PostsData {
  posts: PostData[];
}
