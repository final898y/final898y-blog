---
title: LeetCode 70 - Climbing Stairs練習
date: 2025-07-28
tags: [程式設計, LeetCode, Recursion, Dynamic Programming]
description: LeetCode 70 - Climbing Stairs練習
---

# LeetCode 70 - Climbing Stairs

## 【題目描述】

You are climbing a staircase. It takes `n` steps to reach the top.
Each time you can either climb 1 or 2 steps.
In how many distinct ways can you climb to the top?

### 範例

```
Input: n = 3
Output: 3
Explanation:
1. 1 + 1 + 1
2. 1 + 2
3. 2 + 1
```

---

## 【Python 動態規劃解法】

### 基本思路

一步一步爬樓梯，每次只能爬 1 或 2 階。最後一步有兩種可能：

- 最後爬 1 階：上一階的爬法數
- 最後爬 2 階：上上階的爬法數

所以這題的內在算法，就是「斜正版的斜略 Fibonacci 」。

### 代碼

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n

        first = 1   # 第1階有1種
        second = 2  # 第2階有2種

        for i in range(3, n + 1):
            third = first + second
            first = second
            second = third

        return second
```

### 流程解說

1. 第 1 階、第 2 階是基礎個案
2. 從第 3 階開始計算：

   - 第 3 階 = 第 1 + 第 2
   - 第 4 階 = 第 2 + 第 3
   - 以此類推

3. 這是其中 O(n) 時間、O(1) 空間複雜度的優化版

---

## 【Python 通常遞迴解法】

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        return self.climbStairs(n - 1) + self.climbStairs(n - 2)
```

### 缺點

- 重複計算：每個結果都會一直重計
- 時間複雜度 O(2^n)，很慢

### 遞迴流程圖示（以 n = 4 為例）

```
climbStairs(4)
├── climbStairs(3)
│   ├── climbStairs(2) → 2
│   └── climbStairs(1) → 1
└── climbStairs(2) → 2
```

最終加總：climbStairs(4) = climbStairs(3) + climbStairs(2) = 3 + 2 = 5

這個流程圖展示了 `climbStairs(2)` 被重複呼叫，說明為什麼一般遞迴效率低落。

---

## 【Memoization 記憶驟版解法】

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        memo = {}

        def climb(i):
            if i <= 2:
                return i
            if i in memo:
                return memo[i]
            memo[i] = climb(i - 1) + climb(i - 2)
            return memo[i]

        return climb(n)
```

### 流程解說

1. 建立 `memo` 來記錄已經算過的解
2. 每次重複計算前，先查看 `memo`
3. 如果有，直接用；沒有才繼續爬
4. 時間複雜度 O(n)，空間也 O(n)

---

## 【C# 動態規劃解法】

```csharp
public class Solution {
    public int ClimbStairs(int n) {
        if (n <= 2) return n;

        int first = 1;
        int second = 2;

        for (int i = 3; i <= n; i++) {
            int third = first + second;
            first = second;
            second = third;
        }

        return second;
    }
}
```

---

## 【TypeScript 動態規劃解法】

```ts
function climbStairs(n: number): number {
  if (n <= 2) return n;

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
    const third = first + second;
    first = second;
    second = third;
  }

  return second;
}
```

---

## 【結論】

- 這題的根本是 Fibonacci 的一種對應解
- 從簡單遞迴，優化到動態規劃，學會轉換思維很重要

* 該題是初學 DP（動態規劃，Dynamic Programming）的基礎，必學學習相關模式。

  ### 補充：什麼是 DP（動態規劃）？

  DP 是一種「把大問題拆成小問題，然後記住小問題答案」的技巧。

  - 主要用在「有重複子問題」的情況，例如爬樓梯、費波那契數列、最短路徑等等。
  - 目標是減少重複計算，加快運算速度。

  DP 解題有兩個關鍵：

  1. **狀態定義（State）**：用一個變數或陣列記住子問題的答案。
  2. **狀態轉移（Transition）**：根據前面算過的結果推出下一個答案。

  在這題中：

  - 狀態是：爬到第 n 階有幾種走法。
  - 狀態轉移是：`dp[n] = dp[n - 1] + dp[n - 2]`

  這種從小問題（低樓層）慢慢推到大問題（高樓層）的方法，就是典型 DP 思維。

## 【進一步練習：狀態定義與轉移的經典 DP 題型】

要熟悉動態規劃（DP）思維，可以從下列幾個經典題目開始練習：

### 1. LeetCode 198. House Robber

- 題意：每個房子有錢，但不能搶連續兩間，求最大總金額。
- 狀態定義：`dp[i]` 代表搶到第 i 間的最大金額。
- 狀態轉移：`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

### 2. LeetCode 746. Min Cost Climbing Stairs

- 題意：每一步有花費，走到最後一階需花費最少。
- 狀態定義：`dp[i]` 代表到第 i 階的最小花費。
- 狀態轉移：`dp[i] = min(dp[i-1], dp[i-2]) + cost[i]`

### 3. LeetCode 300. Longest Increasing Subsequence

- 題意：求一個數列中最長的遞增子序列長度。
- 狀態定義：`dp[i]` 代表以第 i 個數結尾的遞增子序列長度。
- 狀態轉移：對所有 j < i 且 nums\[j] < nums\[i]，取最大 `dp[i] = max(dp[i], dp[j] + 1)`

### 4. LeetCode 322. Coin Change

- 題意：給你硬幣面額，要湊出金額 n 最少需要幾個硬幣。
- 狀態定義：`dp[i]` 代表湊出金額 i 最少硬幣數。
- 狀態轉移：對每個硬幣 c，`dp[i] = min(dp[i], dp[i - c] + 1)`

這些題目能幫你熟悉：

- 狀態如何定義（dp 陣列代表什麼）
- 狀態轉移公式如何推導
