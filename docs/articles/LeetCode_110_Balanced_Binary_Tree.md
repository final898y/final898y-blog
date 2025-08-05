---
title: 110 - Balanced Binary Tree
date: 2025-08-05
tags: [程式設計, LeetCode, Binary Tree, Recursion]
description: 練習Binary Tree和遞迴。
---

# LeetCode 110. Balanced Binary Tree

---

## 📘 題目：Balanced Binary Tree

> Given a binary tree, determine if it is height-balanced.
>
> A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

**Example 1:**

```

Input: root = \[3,9,20,null,null,15,7]
Output: true

```

**Example 2:**

```

Input: root = \[1,2,2,3,3,null,null,4,4]
Output: false

```

## ✅ 我本來的寫法

```python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def depth(root: Optional[TreeNode]) -> int:
            if root is None:
                return 0
            leftdep = depth(root.left)
            rightdep = depth(root.right)
            if abs(leftdep - rightdep) > 1:
                return -1
            return max(leftdep, rightdep) + 1
        return depth(root) != -1
```

## ❌ 問題分析：少了哪些條件？

你忘了加入這段關鍵邏輯：

```python
if leftdep == -1 or rightdep == -1:
    return -1
```

### 為什麼這段很重要？

因為：

- 若子樹已經不平衡（回傳 -1），你仍繼續比較深度 → 可能會「錯把不平衡的樹判斷成平衡」。
- `-1` 代表的是「不合法的深度」，不能再拿來做 `abs()` 比較。

---

## 正解

```python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def depth(root: Optional[TreeNode]) -> int:
            if root is None:
                return 0
            leftdep = depth(root.left)
            if(leftdep == -1): return -1
            rightdep = depth(root.right)
            if(rightdep == -1): return -1
            if abs(leftdep - rightdep) > 1:
                return -1
            return max(leftdep, rightdep) + 1
        return depth(root) != -1
```

## 🧪 兩個測資說明「少了會不會出錯」

### ✅ 測資 1：不會出錯但運氣好

```text
輸入：
    1
   / \
  2   3
 /
4

分析：
- 節點 4：高度 1
- 節點 2：左=1，右=0 → abs=1 ✅
- 節點 1：左=2，右=1 → abs=1 ✅
→ 即使沒檢查 -1，也不會出錯（但這是運氣好）
```

---

### ❌ 測資 2：\[1,2,2,3,null,null,3,4,null,null,4]

```text
對應樹結構：
        1
       / \
      2   2
     /     \
    3       3
   /         \
  4           4

左子樹高度 3 → 2 → 1（不平衡，return -1）
右子樹高度也一樣 → return -1

若沒檢查 left/right == -1：
→ abs(-1 - (-1)) = 0 ❌ 誤判為平衡！

正確作法是：
if left == -1 or right == -1:
    return -1
```

---

## 🌳 遞迴流程圖（文字版說明）

```
樹形結構：

        1
       / \
      2   2
     /     \
    3       3
   /         \
  4           4

- 先處理最底層 4 → 回傳 1
- 節點 3 → 左=1，右=0 → 回傳 2
- 節點 2 → 左=2，右=0 → 差值=2 ❌ 回傳 -1
- 回到節點 1，收到左、右都 -1，若沒檢查 → 誤判平衡
```

---

## 🔷 C# 解法（含註解）

```csharp
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution {
    public bool IsBalanced(TreeNode root) {
        return GetDepth(root) != -1;
    }

    private int GetDepth(TreeNode node) {
        if (node == null) return 0;

        int left = GetDepth(node.left);
        if (left == -1) return -1;

        int right = GetDepth(node.right);
        if (right == -1) return -1;

        if (Math.Abs(left - right) > 1) return -1;

        return Math.Max(left, right) + 1;
    }
}
```

---

## 🟨 TypeScript 解法（含註解）

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

function isBalanced(root: TreeNode | null): boolean {
  return getDepth(root) !== -1;
}

function getDepth(node: TreeNode | null): number {
  if (!node) return 0;

  const left = getDepth(node.left);
  if (left === -1) return -1;

  const right = getDepth(node.right);
  if (right === -1) return -1;

  if (Math.abs(left - right) > 1) return -1;

  return Math.max(left, right) + 1;
}
```

---

## 🧠 學習重點整理

- ✅ 使用後序遞迴（先處理左右子樹，再看自己）
- ✅ 使用 `-1` 做為「不平衡」標記值
- ✅ 判斷條件需包含：

  ```python
  if left == -1 or right == -1 or abs(left - right) > 1
  ```

- ✅ 利用「剪枝」讓程式提早終止不必要的遞迴
- ✅ 平衡與否可由 `depth(root) != -1` 判斷

---

## 🔗 推薦延伸練習題目

| 題號 | 題目名稱                                                                                    | 概念重點                |
| ---- | ------------------------------------------------------------------------------------------- | ----------------------- |
| 104  | [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | 純粹遞迴算高度          |
| 543  | [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)           | 後序遞迴計算最大路徑    |
| 111  | [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | 判斷最近葉節點的距離    |
| 226  | [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)                     | 練習 DFS 遍歷與左右交換 |
