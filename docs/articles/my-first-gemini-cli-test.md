---
title: 使用 Gemini CLI 打造高效程式設計體驗：第一次體驗
date: 2025-06-26
tags: [程式設計, Gemini CLI, AI, 初學者]
---

# 使用 Gemini CLI 打造高效程式設計體驗：第一次體驗

作為一名程式設計新手，我最近體驗了 **Gemini CLI**，這是一個強大的命令列工具，能夠與 AI 模型互動，協助處理程式碼、文件查詢等任務。以下，我將分享我的使用過程，介紹 **Gemini CLI** 的核心功能，並結合官方說明，讓你快速了解如何使用這個工具提升程式設計效率。

## Gemini CLI 簡介

**Gemini CLI** 是一個基於 Node.js 的命令列介面工具，專為與 Google Gemini 模型互動設計。它不僅能回答程式相關問題，還能透過特定的命令（如 `@` 與 `/`）與檔案互動、管理對話歷史，甚至執行 shell 指令。以下是我的使用心得與功能的簡單介紹。

### 先決條件 (Prerequisites)

要開始使用 **Gemini CLI**，你需要確保已安裝 **Node.js 18 或更高版本**。接著，你可以透過以下兩種方式啟動 CLI：

1. **直接執行**：

   ```bash
   npx https://github.com/google-gemini/gemini-cli
   ```

   這是最快速的方式，無需安裝即可試用。

2. **全域安裝**：

   ```bash
   npm install -g @google/gemini-cli
   gemini
   ```

   ![安裝畫面](/articlepic/250626_001.png)

   安裝後，輸入 `gemini` 即可啟動，並選擇一個顏色主題 (**color theme**)。

   ![顏色選擇](/articlepic/250626_002.png)

### 身分驗證 (Authenticate)

啟動後，系統會提示你使用個人 Google 帳號登入。這將授予你每分鐘最多 60 次模型請求 (**model requests**)，每天最多 1,000 次。如果你需要更高的請求限制或特定模型，可以從 **Google AI Studio** 生成 **API key**，並在終端機中設定環境變數：

```bash
export GEMINI_API_KEY="YOUR_API_KEY"
```

完成這些步驟後，你就可以開始使用 **Gemini CLI** 了！

---

## 核心功能介紹

在我的試用過程中，我主要使用了 **Gemini CLI** 的以下功能，這些功能讓我能夠更高效地檢查和修改程式碼。

### 1. 與檔案互動：@ 命令 (At Commands)

**@ 命令** 是 **Gemini CLI** 的一大亮點，它允許你直接將檔案或目錄的內容注入到與 AI 的對話中，特別適合需要分析程式碼或文件的場景。以下是我在試用中的實際體驗：

#### 使用情境：檢查與修改分頁功能

在我的購物網站專案中，我需要檢查 `src/views/Home.vue` 的分頁功能，並對後端 API `productRepository.ts` 進行修改。我使用了以下命令：

```
@src/views/Home.vue 幫我檢查這個vue文件的分頁功能
```

**Gemini CLI** 會自動讀取指定檔案的內容，並顯示處理結果：

```
Successfully read and concatenated content from **1 file(s)**.
Processed Files:
- `src/views/Home.vue`
```

接著，AI 分析了檔案，確認分頁邏輯已經包含「上一頁」、「下一頁」和頁碼選擇功能，並指出問題可能出在後端 API 返回的商品總數 (`total`) 為 0。透過 `@../TradePlatformBackEnd/src/repositorys/productRepository.ts`，我進一步要求修改 Supabase 查詢，加入 `{ count: 'exact' }` 以正確獲取商品總數。

#### 生活比喻

想像你有一本厚厚的食譜書（你的專案資料夾），而 **@ 命令** 就像一個聰明的廚師助手，能瞬間幫你翻到指定的食譜頁面（檔案），並告訴你這道菜的做法是否正確，還能建議如何改進！

#### 程式設計最佳實踐

- **精確指定路徑**：確保檔案路徑正確，例如 `@src/views/Home.vue`。如果路徑包含空格，記得用反斜線轉義，例如 `@My\ Documents/file.txt`。
- **Git-aware 過濾**：**Gemini CLI** 會自動忽略 `node_modules` 或 `.git` 等檔案，這有助於提升效率，避免處理不相關的內容。
- **檢查錯誤訊息**：如果檔案路徑無效，CLI 會顯示錯誤訊息，提醒你檢查輸入。

---

### 2. 對話歷史管理：/chat 命令

**Gemini CLI** 的 **/chat 命令** 讓我可以儲存和恢復對話歷史，這對於需要回顧或延續之前的討論非常有用。在我的試用中，我使用了以下指令：

```
/chat save firstAIcliTEST
```

這將當前對話儲存為標籤 `firstAIcliTEST`。之後，我可以透過以下命令查看所有儲存的對話：

```
/chat list
```

結果顯示：

```
list of saved conversations: firstAIcliTEST
```

如果我想繼續之前的對話，只需輸入：

```
/chat resume firstAIcliTEST
```

#### 生活比喻

這就像在學習時用書籤標記重要的筆記頁面，隨時可以翻回去複習或繼續學習。

#### 程式設計最佳實踐

- **為對話命名**：儲存對話時，使用有意義的標籤名稱（如 `firstAIcliTEST`），方便後續查找。
- **管理對話歷史**：定期檢查和清理不必要的儲存對話，以保持工作區整潔。

---

### 3. 其他實用命令

**Gemini CLI** 還支援其他命令，例如：

- **/bug**：提交問題回報。例如，`/bug 分頁功能無法顯示` 會在 GitHub 上建立一個 issue，標題為「分頁功能無法顯示」。
- **! 命令**：執行 shell 指令，例如 `!npm run start` 可以啟動伺服器。
- **/help**：顯示所有可用命令的說明，幫助新手快速上手。

---

## 實戰中的學習心得

在這次試用中，我學到了以下幾點：

1. **分步驟診斷問題**：當分頁功能未顯示時，**Gemini CLI** 引導我檢查後端 API 的 `total` 值，發現問題出在 Supabase 查詢未正確返回商品總數。這讓我學會將問題拆解成小步驟，逐一排查。
2. **善用日誌**：在前端和後端加入 `console.log` 來檢查 `totalProducts` 和 `pageSize`，這是 debug 的好習慣。
3. **理解分頁邏輯**：分頁功能依賴 `totalPages = Math.ceil(totalProducts / pageSize)`，只有當 `totalPages > 1` 時，分頁才會顯示。這幫助我更深入理解前端與後端的協作。

---

## 延伸學習資源

如果你想進一步探索 **Gemini CLI** 或相關技術，推薦以下資源：

- **官方文件**：查看 [Gemini CLI 官方文件](https://github.com/google-gemini/gemini-cli) 了解更多進階用法。
- **Vue.js 分頁實作**：學習如何在 Vue.js 中實現分頁，參考 [Vue.js 官方文件](https://vuejs.org/) 或 [DaisyUI 分頁組件](https://daisyui.com/components/join/)。
- **Supabase 查詢**：深入了解 Supabase 的分頁查詢，參考 [Supabase 官方文件](https://supabase.com/docs)。

---

## 結語

**Gemini CLI** 是一個強大且易用的工具，特別適合像我這樣的程式新手。透過 **@ 命令**，我可以輕鬆與程式碼檔案互動；透過 **/chat 命令**，我能管理對話歷史，隨時回顧學習進度。它的設計不僅提升了我的程式設計效率，還讓我學會如何更有條理地解決問題。如果你也想提升程式設計能力，不妨試試 **Gemini CLI**，它會成為你學習路上的好幫手！
