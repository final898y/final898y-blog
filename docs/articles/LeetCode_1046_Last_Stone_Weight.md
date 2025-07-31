---
title: 1046 - Last Stone Weight
date: 2025-07-30
tags: [程式設計, LeetCode, heap]
description: 1046 - Last Stone Weight練習List和heap。
---

# 1046. Last Stone Weight

## 📝 Problem Statement (English)

You are given an array of integers `stones` where `stones[i]` is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights `x` and `y` with `x <= y`. The result of this smash is:

- If `x == y`, both stones are destroyed, and
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

At the end of the game, there is **at most one stone left**.

Return the weight of the last remaining stone. If there are no stones left, return `0`.

---

### 💡 Example 1:

**Input:**  
`stones = [2,7,4,1,8,1]`  
**Output:**  
`1`  
**Explanation:**

- Combine 7 and 8 → get 1 → stones = `[2,4,1,1,1]`
- Combine 2 and 4 → get 2 → stones = `[2,1,1,1]`
- Combine 2 and 1 → get 1 → stones = `[1,1,1]`
- Combine 1 and 1 → get 0 → stones = `[1]`
- Return 1

---

### 💡 Example 2:

**Input:**  
`stones = [1]`  
**Output:**  
`1`

---

### 🔒 Constraints:

- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 1000`

---

## 🔧 我的原始寫法（較冗長、可優化）

```python
from typing import List

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        while len(stones) > 1:
            stones.sort()
            if(stones[len(stones)-1]==stones[len(stones)-2]):
                stones.pop()
                stones.pop()
                continue
            if(stones[len(stones)-1]<stones[len(stones)-2]):
                stones[len(stones)-2] = stones[len(stones)-2]-stones[len(stones)-1]
                stones.pop()
                continue
            if(stones[len(stones)-1]>stones[len(stones)-2]):
                stones[len(stones)-2] = stones[len(stones)-1]-stones[len(stones)-2]
                stones.pop()
                continue
        if(len(stones)==1): return stones[0]
        if(len(stones)==0): return 0
```

---

## ✅ 精簡寫法：sort + pop()

### 🧼 改寫後更簡潔：

```python
from typing import List

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        while len(stones) > 1:
            stones.sort()
            first = stones.pop()      # 最大
            second = stones.pop()     # 次大
            if first != second:
                stones.append(first - second)
        return stones[0] if stones else 0
```

---

### 🔄 流程圖（文字模擬）

```
[2,7,4,1,8,1]
 ↓ 排序
[1,1,2,4,7,8]
 → pop 8, 7 → append 1 → [1,1,2,4,1]
 ↓ 排序
[1,1,1,2,4]
 → pop 4, 2 → append 2 → [1,1,1,2]
 ↓ 排序
[1,1,1,2]
 → pop 2, 1 → append 1 → [1,1,1]
 ↓ 排序
[1,1,1]
 → pop 1, 1 → append 0 → [1]
 → return 1
```

---

## 🚀 進階寫法：使用 max-heap

### ⚙️ Python `heapq`（使用負數模擬最大堆）

```python
import heapq
from typing import List

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        # 建立 max-heap（用負數模擬）
        stones = [-s for s in stones]
        heapq.heapify(stones)

        while len(stones) > 1:
            first = -heapq.heappop(stones)
            second = -heapq.heappop(stones)
            if first != second:
                heapq.heappush(stones, -(first - second))

        return -stones[0] if stones else 0
```

---

### 🔄 Heap 模擬流程（文字動畫）

初始：

```
stones = [2,7,4,1,8,1]
→ 轉負數 = [-2,-7,-4,-1,-8,-1]
→ heapify → [-8,-7,-4,-1,-2,-1]
```

執行流程：

```
→ pop -8 (8), -7 (7) → append -1 → heap = [-4,-2,-1,-1,-1]
→ pop -4 (4), -2 (2) → append -2 → heap = [-2,-1,-1,-1]
→ pop -2 (2), -1 (1) → append -1 → heap = [-1,-1,-1]
→ pop -1 (1), -1 (1) → 沒剩差值 → heap = [-1]
→ return 1
```

## 🧮 1. 資料結構與時間複雜度分析

| 操作方式           | 說明                                   | 時間複雜度   |
| ------------------ | -------------------------------------- | ------------ |
| `stones.sort()`    | 每次重新排序整個列表                   | `O(n log n)` |
| `stones.pop()`     | 移除最後一個元素（尾端）               | `O(1)`       |
| `stones.pop(0)`    | 移除第一個元素（頭部，會搬移整個陣列） | `O(n)`       |
| `heapq.heappop()`  | 移除堆頂元素（自動維護 heap 結構）     | `O(log n)`   |
| `heapq.heappush()` | 插入新元素並維持 heap 結構             | `O(log n)`   |

### ✅ 整體比較：

| 方法       | 每回合成本                     | 總體迴圈次數 | 整體時間複雜度 |
| ---------- | ------------------------------ | ------------ | -------------- |
| sort + pop | `O(n log n)` 排序 + `O(1)` pop | 約 `n` 回合  | `O(n^2 log n)` |
| heapq      | `O(log n)` pop/push            | 約 `n` 回合  | `O(n log n)`   |

### 📌 小結論：

- 小筆資料（長度 < 30）用 `sort + pop()` 寫法更直覺。
- 資料量大時，**使用 heapq 才能保持高效率。**

---

## 💻 2. C# 與 TypeScript 實作

---

### ✅ C# 版本（使用 `List<int>` 與 `Sort()`）

```csharp
using System;
using System.Collections.Generic;

public class Solution {
    public int LastStoneWeight(int[] stones) {
        var list = new List<int>(stones);

        while (list.Count > 1) {
            list.Sort();  // 小到大
            int y = list[list.Count - 1];
            int x = list[list.Count - 2];
            list.RemoveAt(list.Count - 1);
            list.RemoveAt(list.Count - 1);
            if (x != y) {
                list.Add(y - x);
            }
        }

        return list.Count == 1 ? list[0] : 0;
    }
}
```

---

### ✅ TypeScript 版本（使用 `sort()` 和 `pop()`）

```ts
function lastStoneWeight(stones: number[]): number {
  while (stones.length > 1) {
    stones.sort((a, b) => a - b); // 小到大排序
    const y = stones.pop()!; // 最大值
    const x = stones.pop()!; // 次大值

    if (x !== y) {
      stones.push(y - x);
    }
  }

  return stones.length === 1 ? stones[0] : 0;
}
```

---

## 📘 延伸學習建議

### 🎯 建議補強的資料結構觀念：

- List / Array 的效能比較
- Heap（二元堆）的結構與操作
- 為何 Heap 適合動態取最大/最小值

### 🧠 類似 LeetCode 練習題：

| 題號                                                                  | 題目名稱                        | 類型       |
| --------------------------------------------------------------------- | ------------------------------- | ---------- |
| [703](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Kth Largest Element in a Stream | heap       |
| [347](https://leetcode.com/problems/top-k-frequent-elements/)         | Top K Frequent Elements         | heap + map |
| [295](https://leetcode.com/problems/find-median-from-data-stream/)    | Find Median from Data Stream    | 雙 heap    |

### 📚 推薦資源：

- 📘 書籍：《演算法圖解》（適合初學者）
- 🧱 視覺化工具：[https://visualgo.net/en/heap](https://visualgo.net/en/heap)
- 🔧 Python heapq 文件：[https://docs.python.org/3/library/heapq.html](https://docs.python.org/3/library/heapq.html)

---
