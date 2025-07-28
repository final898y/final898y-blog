---
title: Leetcode：Linked List（鏈結串列）與Merge Two Sorted Lists 解題整理
date: 2025-07-17
tags: [程式設計, Leetcode, Linked List]
description: Linked List（鏈結串列）基礎介紹。
---

# ListNode 基本知識與 Merge Two Sorted Lists 解題整理

## 🧱 ListNode 基礎結構解說

在 LeetCode 題目中，經常會遇到 Linked List（鏈結串列）的題目，而 `ListNode` 是最常見的節點定義。

```csharp
public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val = 0, ListNode next = null) {
        this.val = val;
        this.next = next;
    }
}
```

### 🧠 結構說明：

- `val`: 當前節點的數值。
- `next`: 指向下一個節點的參考（reference），最後一節會是 `null`。

### 🧱 建立串列的方式

```csharp
ListNode node3 = new ListNode(30);
ListNode node2 = new ListNode(20, node3);
ListNode node1 = new ListNode(10, node2);
```

這樣就建立了一條串列：`10 -> 20 -> 30`

## 🌀 ListNode 記憶體共用與 new 差異

### ✅ `new ListNode(...)`

- 這樣會建立一個新的物件（節點），開闢新的記憶體空間。
- 即使值一樣，仍是不同的節點。

```csharp
ListNode a = new ListNode(5);
ListNode b = new ListNode(5); // a 與 b 是不同物件
```

### ✅ `x = y`

- 並不會建立新節點，只是讓 `x` 指向 `y` 所指的那個節點。
- 因此如果修改 `x.val`，`y.val` 也會跟著改，因為兩者共用記憶體。

```csharp
ListNode a = new ListNode(5);
ListNode b = a;
b.val = 99;
Console.WriteLine(a.val); // 會是 99
```

---

## 🔍 不同語言中建立 ListNode 的差異比較

| 語言           | 建立物件語法      | 是否需要 `new` | 建構子名稱      | 說明                                     |
| -------------- | ----------------- | -------------- | --------------- | ---------------------------------------- |
| **C#**         | `new ListNode(5)` | ✅ 需要        | `ListNode(...)` | 類別建立必須用 new，強型別語言           |
| **Python**     | `ListNode(5)`     | ❌ 不需要      | `__init__()`    | 動態語言，建構子自動呼叫                 |
| **TypeScript** | `new ListNode(5)` | ✅ 需要        | `constructor()` | 遵循 JavaScript 行為，建構子不能直接呼叫 |

在 Python 中，類別建立時會自動分配記憶體與呼叫 `__init__`，因此不需要 `new`。
而 C# 與 TypeScript 屬於靜態語言（或強型別語言），為了確保物件正確實體化，**必須使用 `new` 來產生新物件**。

---

## 📘 LeetCode 21. Merge Two Sorted Lists

### 📝 Problem Description (English):

> You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one **sorted** list. The list should be made by **splicing together** the nodes of the first two lists. Return the **head of the merged linked list**.

---

## 💡 解法邏輯概述（通用）：

1. 建立一個虛擬節點 `dummy` 作為起點。
2. 使用 `tail` 指標記錄目前合併串列的最後一節。
3. 比較 `list1` 與 `list2` 的值，小的節點接上去，然後往前移。
4. 把剩下沒走完的串列接上去。
5. 回傳 `dummy.next`（合併後串列的頭）。

---

## 🔧 C# 解法

```csharp
public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        if (list1 != null) tail.next = list1;
        if (list2 != null) tail.next = list2;

        return dummy.next;
    }
}
```

---

## 🔧 TypeScript 解法

```ts
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(-1);
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  tail.next = list1 !== null ? list1 : list2;

  return dummy.next;
}
```

---

## 🔧 Python 解法

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(list1: ListNode | None, list2: ListNode | None) -> ListNode | None:
    dummy = ListNode(-1)
    tail = dummy

    while list1 and list2:
        if list1.val < list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next

    tail.next = list1 or list2

    return dummy.next
```
