---
title: LeetCode 66 - Plus One
date: 2025-07-30
tags: [程式設計, LeetCode, Recursion, Dynamic Programming]
description: LeetCode 66 - Plus One 練習迴圈和遞迴解法。
---

# LeetCode 66 - Plus One

感覺最近寫太多遞迴腦袋卡死了，第一步不是想到最簡單的 loop 而是硬要使用遞迴...

## 🧠 題目說明（英文原文）

> You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the i-th digit of the integer.  
> The digits are ordered from most significant to least significant in left-to-right order.  
> The large integer does not contain any leading `0`'s.
>
> Increment the large integer by one and return the resulting array of digits.

---

## ✨ 題目範例

```
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 124.
```

```
Input: digits = [9,9,9]
Output: [1,0,0,0]
Explanation: The array represents the integer 999.
Incrementing by one causes a carry all the way to a new digit at the front.
```

## Constraints:

- 1 <= digits.length <= 100
- 0 <= digits[i] <= 9
- digits does not contain any leading 0's.

---

## 解法一：✅ 遞迴版本

### 💡 思路解析

我們從最後一位數加 1。  
如果該位數不是 9，直接加完就結束。  
如果是 9，就變成 0，並且往前遞迴處理「進位 carry」。

---

### 🔁 遞迴程式碼（Python）

```python
from typing import List

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        def handleCarry(index: int):
            # 遞迴結束條件：如果 index 小於 0，表示要在最前面補一個 1
            if index < 0:
                digits.insert(0, 1)
                return

            if digits[index] < 9:
                # 不需要進位，直接加 1
                digits[index] += 1
            else:
                # 如果是 9，變成 0 並往前進位
                digits[index] = 0
                handleCarry(index - 1)

        # 從最後一位開始處理
        handleCarry(len(digits) - 1)
        return digits
```

---

## 解法二：✅ 使用迴圈（loop）處理（3 種語言）

### 🧠 解法邏輯

從最後一位往前處理：

1. 如果 `digits[i] < 9`，就直接加 1 並結束。
2. 否則，將該位設為 0，繼續往前進位。
3. 如果整串都是 9（如 [9,9,9]），最後補上 `1`。

---

### 🐍 Python 版本

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in reversed(range(len(digits))):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0

        # 若全部為 9，最後加上 1
        return [1] + digits
```

---

### 💻 C# 版本

```csharp
public class Solution {
    public int[] PlusOne(int[] digits) {
        for (int i = digits.Length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }

        // 全部為 9 的情況
        int[] result = new int[digits.Length + 1];
        result[0] = 1;
        return result;
    }
}
```

---

### 🌐 TypeScript 版本

```ts
function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }

  // 全部為 9，補上最前面的 1
  return [1, ...digits];
}
```

---

## 🧰 小技巧回顧

| 技巧            | 說明                             |
| --------------- | -------------------------------- |
| 遞迴            | 遇到進位往前推的情境時非常好用   |
| 反向迴圈        | 從尾端處理到開頭，常見於數字運算 |
| `insert`        | Python 中可在開頭插入新元素      |
| `result[0] = 1` | C# 中建立新陣列並手動設定        |

---

## 📘 延伸學習資源

- [Python list.insert 官方文件](https://docs.python.org/3/tutorial/datastructures.html)
- 遞迴教學入門：推薦閱讀 [Visualgo.net](https://visualgo.net/en/recursion)
- 類似題目：LeetCode 67. Add Binary / 415. Add Strings

---

## 🎯 總結

- 這題雖然簡單，但鍛鍊你對陣列處理的細膩度。
- 同時也可用來理解進位邏輯與遞迴的實用性。
- 寫完 loop 解法後，挑戰看看遞迴解法是很棒的進階練習。
