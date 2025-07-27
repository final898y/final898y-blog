---
title: Leetcode：Binary Tree 104、100、572 解題整理
date: 2025-07-28
tags: [程式設計, Leetcode, Binary Tree, Recursion, AI輸出文章]
description: 二元樹相關的Easy等級題目整理。
---

# Leetcode：Binary Tree 104、100、572 解題整理

以下是將 LeetCode 題目 **104. Maximum Depth of Binary Tree**、**100. Same Tree**、**572. Subtree of Another Tree** 整理，其中我覺得 572 算是 100 的延伸題型：

```c#
Definition for a binary tree node.
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
```

---

## 📘 104. Maximum Depth of Binary Tree

### Problem

Given the root of a binary tree, return its maximum depth.
A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Examples

Example 1:
![示意圖](/articlepic/202507_12/tmp-tree.jpg)
Input: root = [3,9,20,null,null,15,7]
Output: 3

Example 2:
Input: root = [1,null,2]
Output: 2

### Constraints

- The number of nodes in the tree is in the range \[0, 10⁴].
- -100 <= Node.val <= 100

### 解答

```csharp
public int MaxDepth(TreeNode root) {
    int depth(TreeNode root){
        if (root == null) return 0;
        int leftdep = depth(root.left);
        int rightdep = depth(root.right);
        int bigdep = Math.Max(leftdep, rightdep);
        return (bigdep + 1);
    }
    int ans = depth(root);
    return ans;
}
```

---

## 📘 100. Same Tree

### Problem

Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

### Examples

```text
Example 1:
Input: p = [1,2,3], q = [1,2,3]
Output: true

Example 2:
Input: p = [1,2], q = [1,null,2]
Output: false

Example 3:
Input: p = [1,2,1], q = [1,1,2]
Output: false
```

### Constraints

- The number of nodes in both trees is in the range \[0, 100].
- -10⁴ <= Node.val <= 10⁴

### 解答

```csharp
public bool IsSameTree(TreeNode p, TreeNode q) {
    if(p==null && q==null) return true;
    if(p==null ||q==null) return false;
    if(p.val != q.val) return false;
    return IsSameTree(p.left,q.left) && IsSameTree(p.right,q.right);
}
```

---

## 📘 572. Subtree of Another Tree

### Problem

Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants.
The tree `tree` could also be considered as a subtree of itself.

### Examples

```text
Example 1:
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true

Example 2:
Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false
```

### Constraints

- The number of nodes in the `root` tree is in the range \[1, 2000].
- The number of nodes in the `subRoot` tree is in the range \[1, 1000].
- -10⁴ <= root.val <= 10⁴
- -10⁴ <= subRoot.val <= 10⁴

### 解答

```csharp
public bool IsSubtree(TreeNode root, TreeNode subRoot) {
    bool IsSameTree(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        if (a.val != b.val) return false;
        return IsSameTree(a.left, b.left) && IsSameTree(a.right, b.right);
    }
    if (root == null) return false;
    if (IsSameTree(root, subRoot)) return true;
    return IsSubtree(root.left, subRoot) || IsSubtree(root.right, subRoot);
}
```

## ChatGPT 整理說明

## 📘 104. Maximum Depth of Binary Tree

### ✅ 題目簡述

找出從 root 到最遠葉節點的「最大深度」。

---

### ✅ Python 解法（遞迴）

```python
class Solution:
    def maxDepth(self, root):
        # 若是空樹，深度為 0
        if root is None:
            return 0
        # 遞迴計算左右子樹的最大深度
        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)
        # 當前節點的深度 = 左右子樹深度最大值 + 1（包含自己）
        return max(left_depth, right_depth) + 1
```

---

### ✅ 程式碼逐行說明

```python
# 定義一個解法類別
class Solution:
    def maxDepth(self, root):
        # 如果節點是空的（None），代表到達葉節點的下一層，回傳深度 0
        if root is None:
            return 0

        # 遞迴計算左子樹的最大深度
        left_depth = self.maxDepth(root.left)
        # 遞迴計算右子樹的最大深度
        right_depth = self.maxDepth(root.right)

        # 選擇左右兩邊深度較大的那一邊，並加上目前這一層 (+1)
        return max(left_depth, right_depth) + 1
```

---

### ✅ 遞迴流程圖（文字模擬）

以 `[3,9,20,null,null,15,7]` 為例：

```
        3
       / \
      9  20
         / \
        15  7
```

流程如下：

```
maxDepth(3)
→ maxDepth(9) → maxDepth(None) = 0, maxDepth(None) = 0 → return 1
→ maxDepth(20)
   → maxDepth(15) = 1
   → maxDepth(7)  = 1
   → return 2
→ return max(1, 2) + 1 = 3
```

### C#和 TypeScript 版本

```csharp
public class Solution {
    public int MaxDepth(TreeNode root) {
        // 如果節點為 null，深度為 0
        if (root == null)
            return 0;

        // 遞迴找左右子樹深度
        int left = MaxDepth(root.left);
        int right = MaxDepth(root.right);

        // 回傳最大深度 +1（包含目前節點）
        return Math.Max(left, right) + 1;
    }
}
```

```ts
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const left = maxDepth(root.left);
  const right = maxDepth(root.right);

  return Math.max(left, right) + 1;
}
```

---

## 📘 100. Same Tree

### ✅ 題目簡述

判斷兩棵樹是否「結構相同」且「值相同」。

---

### ✅ Python 解法（遞迴）

```python
class Solution:
    def isSameTree(self, p, q):
        # 都為空，表示這段結構相同
        if not p and not q:
            return True
        # 一棵空、一棵非空，結構不同
        if not p or not q:
            return False
        # 值不同，不相同
        if p.val != q.val:
            return False
        # 遞迴檢查左右子樹是否都相同
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

---

### ✅ 程式碼逐行說明

```python
class Solution:
    def isSameTree(self, p, q):
        # 如果兩個節點都是 None，代表這段相同
        if not p and not q:
            return True

        # 如果其中一個是 None，另一個不是，結構不同
        if not p or not q:
            return False

        # 兩個節點的值不一樣，也代表不同
        if p.val != q.val:
            return False

        # 遞迴檢查左子樹和右子樹是否都一樣
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

---

### ✅ 遞迴流程圖（文字模擬）

以 `[1,2,3]` 和 `[1,2,3]`：

```
     1              1
    / \            / \
   2   3          2   3
```

```
isSameTree(1,1) → 值相同
→ isSameTree(2,2) → 值相同 → 回傳 True
→ isSameTree(3,3) → 值相同 → 回傳 True
→ 回傳 True and True = True
```

### C#和 TypeScript 版本

```csharp
public class Solution {
    public bool IsSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;

        return IsSameTree(p.left, q.left) && IsSameTree(p.right, q.right);
    }
}
```

```ts
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

---

## 📘 572. Subtree of Another Tree

### ✅ 題目簡述

判斷 `subRoot` 是否是 `root` 的一個「子樹」。

---

### ✅ Python 解法（遞迴 + 使用上面 isSameTree）

```python
class Solution:
    def isSubtree(self, root, subRoot):
        if not root:
            return False
        # 若這個節點和 subRoot 相同 → 結束
        if self.isSameTree(root, subRoot):
            return True
        # 否則繼續往左或右找子樹
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)

    # 判斷兩棵樹是否相同（100 題的函式）
    def isSameTree(self, p, q):
        if not p and not q:
            return True
        if not p or not q:
            return False
        if p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

---

### ✅ 程式碼逐行說明

```python
class Solution:
    def isSubtree(self, root, subRoot):
        # 如果 root 是空的，那不可能含有任何子樹
        if not root:
            return False

        # 如果目前節點和 subRoot 是同樣的樹 → 結束
        if self.isSameTree(root, subRoot):
            return True

        # 否則遞迴往左右子樹去找
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)

    # 判斷兩棵樹是否完全相同（重複利用 100 題解法）
    def isSameTree(self, p, q):
        if not p and not q:
            return True
        if not p or not q:
            return False
        if p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

---

### ✅ 遞迴流程圖（文字模擬）

以：

```text
root     = [3, 4, 5, 1, 2]
subRoot  = [4, 1, 2]
```

```
isSubtree(3, subRoot) →
→ isSameTree(3, 4) → False
→ isSubtree(4, subRoot)
   → isSameTree(4, 4) → True（值相同）
   → isSameTree(1, 1) → True
   → isSameTree(2, 2) → True → 回傳 True
→ 回傳 True
```

### C#和 TypeScript 版本

```csharp
public class Solution {
    public bool IsSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        if (IsSameTree(root, subRoot)) return true;
        return IsSubtree(root.left, subRoot) || IsSubtree(root.right, subRoot);
    }

    private bool IsSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return IsSameTree(p.left, q.left) && IsSameTree(p.right, q.right);
    }
}
```

```ts
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (!root) return false;
  if (isSameTree(root, subRoot)) return true;

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

---

## 📘 小結與建議學習順序

| 題號 | 主題      | 重點概念         | 建議先後 |
| ---- | --------- | ---------------- | -------- |
| 100  | Same Tree | 結構與值的比對   | 第 1 題  |
| 104  | Max Depth | 遞迴高度計算     | 第 2 題  |
| 572  | Subtree   | 套用上面概念遞迴 | 第 3 題  |

---

## 📘 延伸學習資源推薦

- [Binary Tree Visualizer 線上操作](https://visualgo.net/en/bst)
- [Python Tutor](https://pythontutor.com/) – 線上遞迴動畫步驟工具
- LeetCode 類似題目：

  - [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
  - [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)
  - [110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
