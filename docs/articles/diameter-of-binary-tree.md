---
title: Leetcode：543. Diameter of Binary Tree 講義
date: 2025-07-20
tags: [程式設計, Leetcode, Binary Tree, Recursion, AI輸出文章]
description: 二元樹，請找出這棵樹的「直徑」。
---

# 📘 543. Diameter of Binary Tree 講義

## 1️⃣ Binary Tree（二元樹）介紹

### 📌 定義：

Binary Tree（二元樹）是一種樹狀資料結構，每個節點最多有**兩個子節點**：

- 左子節點（Left child）
- 右子節點（Right child）

### 📘 範例：

```text
      1
     / \
    2   3
   / \
  4   5
```

- 根節點：1
- 節點 2 的左子是 4，右子是 5
- 節點 3 沒有子節點

---

## 2️⃣ 遞迴（Recursion）介紹

### 📌 定義：

遞迴是一種函式**自己呼叫自己**的方式，用來處理可以「一層層拆解」的問題。

### ✅ 特徵：

- 一個大問題拆成子問題
- 每次處理一小步
- 最後有個**終止條件**避免無限呼叫

### 📘 生活比喻：

你問一個人「某層樓高幾層？」，他不知道，但會問下面那一層的人，一層層問到底，然後再一層層回報回來。

---

## 3️⃣ 題目說明：543. Diameter of Binary Tree

### 🧩 題目描述：

給你一棵二元樹，請找出這棵樹的「直徑」（Diameter）。
直徑是**兩個節點之間的最長路徑長度（以邊數計）**，不一定要經過根節點。

### 🔍 範例：

輸入：

```text
    [1,2,3,4,5]
```

樹的樣子如下：

```text
      1
     / \
    2   3
   / \
  4   5
```

直徑：`[4 → 2 → 1 → 3]` 或 `[5 → 2 → 1 → 3]`
➡️ 長度是 3（經過 3 條邊）

---

## 4️⃣ 解法與說明

### 🔑 核心觀念：

- 每個節點都可以作為「中間點」
- 該節點的 **左子樹高度 + 右子樹高度** 就是「經過這個節點的最大直徑」
- 使用 DFS 遞迴計算每個節點的深度

---

### 🧠 C# 解法（附註解）

```csharp
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution {
    private int maxDiameter = 0;

    public int DiameterOfBinaryTree(TreeNode root) {
        Depth(root);  // 啟動遞迴計算
        return maxDiameter;
    }

    private int Depth(TreeNode node) {
        if (node == null) return 0;

        int left = Depth(node.left);    // 左子樹深度
        int right = Depth(node.right);  // 右子樹深度

        maxDiameter = Math.Max(maxDiameter, left + right);  // 更新最大直徑

        return Math.Max(left, right) + 1;  // 回傳此節點的最大深度
    }
}
```

---

## 5️⃣ 補充說明與重點整理

### 📌 重點回顧：

| 概念         | 說明                                      |
| ------------ | ----------------------------------------- |
| 樹           | 一種階層結構的資料結構                    |
| 遞迴         | 函式自己呼叫自己處理子問題                |
| DFS          | 深度優先搜尋，一條路走到底再回頭          |
| 子樹深度     | 從當前節點到底部的最大距離（邊數）        |
| 樹的直徑     | 任意兩節點間最長邊數距離                  |
| 計算直徑方式 | 對每個節點計算「左深度 + 右深度」並取最大 |

### 🧱 為什麼用遞迴？

樹本來就是遞迴結構（每個節點都是一棵小樹），用遞迴處理最直覺又簡潔。

---

## 6️⃣ 多語言版本解法

### ✅ TypeScript 版本

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;

  function depth(node: TreeNode | null): number {
    if (!node) return 0;

    const left = depth(node.left);
    const right = depth(node.right);

    maxDiameter = Math.max(maxDiameter, left + right);

    return Math.max(left, right) + 1;
  }

  depth(root);
  return maxDiameter;
}
```

---

### ✅ Python 版本

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        self.max_diameter = 0

        def depth(node):
            if not node:
                return 0

            left = depth(node.left)
            right = depth(node.right)

            self.max_diameter = max(self.max_diameter, left + right)

            return max(left, right) + 1

        depth(root)
        return self.max_diameter
```

## 🪜 模擬樹結構（用來說明遞迴）

輸入樹如下：

```text
      1
     / \
    2   3
   / \
  4   5
```

---

## 🎯 遞迴目標：

我們希望透過每個節點，計算：

1. 左子樹的高度
2. 右子樹的高度
3. 左 + 右 的值來更新目前最大直徑（邊數）

---

## 🔁 遞迴圖解（從底層往上算）

### 步驟一：到達最底層

從節點 4 開始

```
Depth(4):
- left = Depth(null) → 0
- right = Depth(null) → 0
- 更新直徑：max = max(0, 0 + 0) → 0
- 回傳高度：max(0, 0) + 1 = 1
```

```
Depth(5):
- left = Depth(null) → 0
- right = Depth(null) → 0
- 更新直徑：max = max(0, 0 + 0) → 0
- 回傳高度：1
```

---

### 步驟二：回到節點 2

```
Depth(2):
- left = Depth(4) → 1
- right = Depth(5) → 1
- 更新直徑：max = max(0, 1 + 1) → 2 ✅
- 回傳高度：max(1, 1) + 1 = 2
```

---

### 步驟三：處理節點 3

```
Depth(3):
- left = Depth(null) → 0
- right = Depth(null) → 0
- 更新直徑：max = max(2, 0 + 0) → 2
- 回傳高度：1
```

---

### 步驟四：回到根節點 1

```
Depth(1):
- left = Depth(2) → 2
- right = Depth(3) → 1
- 更新直徑：max = max(2, 2 + 1) → 3 ✅
- 回傳高度：max(2, 1) + 1 = 3
```

---

## ✅ 最終直徑：**3**

代表這棵樹中，最長的路徑長度是「3 條邊」，例如：

```
4 → 2 → 1 → 3
```

---

## 📊 用圖表示遞迴呼叫流程

```
DiameterOfBinaryTree(1)
 ├── depth(2)
 │   ├── depth(4)
 │   │   └── depth(null) → 0
 │   │   └── depth(null) → 0
 │   └── depth(5)
 │       └── depth(null) → 0
 │       └── depth(null) → 0
 └── depth(3)
     └── depth(null) → 0
     └── depth(null) → 0
```

---

## 🔁 為何從下往上？

因為你要知道「左邊最深能走多遠」、「右邊最深能走多遠」，才能算出**經過這個節點的最大直徑**
所以我們要「先算完子節點的深度，再回來合併」

---

## 🎓 學習小提醒

- 每次呼叫 `depth(node)` 都是針對「以這個節點為根的子樹」
- **先遞迴到底 → 然後一層層回傳結果上來**
- 把直徑當作「路徑長度 = 左子深度 + 右子深度」
