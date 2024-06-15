---
title: JavaScript数据类型和他背后不得不说的故事
author: 杨少侠
createTime: 2019/08/01 09:42:05
permalink: /article/jb5bn9vm/
tags:
  - 前端
---

### 基本概念

**ECMAScript 中有 5 种简单数据类型(也称为基本数据类型，存放在栈中):`Undefined、Null、Boolean、Number` 和`String`。还有 1 种复杂数据类型——`Object`（存放在堆内存中）。ES6 的`Symbol`暂且不论。**

<!-- more -->

![栈内存](https://image-static.segmentfault.com/317/121/3171219049-59658a7e99909_articlex)
![堆内存](https://image-static.segmentfault.com/147/694/147694112-5c8b5d8d8faf5_articlex)

### 简单粗暴地描述一下这几个类型：

1. Undefined 类型只有一个值，即特殊的 `undefined`。在使用 var 声明变量但未对其加以初始化时，这个变量的值就是 `undefined`，例如:

   ```JavaScript
   var message;
   alert(message == undefined); //true
   ```

2. Null 类型是第二个只有一个值的数据类型，这个特殊的值是 `null`。从逻辑角度来看，`null` 值表示一个空对象指针。

3. Boolean 类型：`true`和`false`。

4. Number 类型：阿拉伯数字的（八进制、十进制、十六进制、整数、浮点数、5e-324 ~ 1.7976931348623157e+308、NaN……）。

5. String 类型：带引号的，单引号双引号都可以（字符串），还有一些特殊的字符字面量（`\n`之类的）

   ```JavaScript
   var firstName = "Nicholas";
   var lastName = 'Zakas';
   ```

6. Object 类型：ECMAScript 中的对象其实就是一组数据和功能的集合(万物皆对象 😄)。对象可以通过执行 new 操作符后跟要创建 的对象类型的名称来创建。而创建 Object 类型的实例并为其添加属性和(或)方法，就可以创建自定义对象，如下所示：

   ```JavaScript
   var o = new Object();
   ```

---

### `typeof`操作符

鉴于 ECMAScript 是松散类型的，因此需要有一种手段来检测给定变量的数据类型——typeof 就是负责提供这方面信息的操作符。对一个值使用 typeof 操作符可能返回下列某个字符串:

- "undefined"——如果这个值未定义;
- "boolean"——如果这个值是布尔值;
- "string"——如果这个值是字符串;
- "number"——如果这个值是数值;
- "object"——如果这个值是对象或 null;
- "function"——如果这个值是函数。

### 有一些需要注意的地方：

1. 有些时候，typeof 操作符会返回一些令人迷惑但技术上却正确的值。比如，调用`typeof null`会返回`"object"`，因为特殊值`null`被认为是一个空的对象引用。从逻辑角度来看，null 值表示一个空对象指针，而这也正是使用 typeof 操作符检测 null 值时会返回"object"的原因。

2. 首先，任何涉及 NaN 的操作(例如 NaN/10)都会返回 NaN，这个特点在多步计算中有可能导致问题。其次，NaN 与任何值都不相等，包括 NaN 本身。例如，下面的代码会返回 false:

   ```JavaScript
   alert(NaN == NaN); //false
   ```

3. 另外，NaN 实际上是一种特殊的 number

   ```JavaScript
   typeof NaN
   "number"
   ```

4. **_《JavaScript 高级程序设计》原书上写道：“任何数值除以 0 都会返回 NaN”，但实际上只有 0 除以 0 才会返回 NaN，正数除以 0 返回 Infinity，负数除以 0 返回-Infinity。_**

5. ECMAScript 定义了 isNaN()函数帮我们确定这个参数是否“不是数值”。isNaN()在接收到一个值之后，会尝试 将这个值转换为数值。某些不是数值的值会直接转换为数值。下面看几个例子：

   ```JavaScript
   alert(isNaN(NaN));      //true
   alert(isNaN(10));       //false(10 是一个数值)
   alert(isNaN("10"));     //false(可以被转换成数值 10)
   alert(isNaN("blue"));   //true(不能转换成数值)
   alert(isNaN(true));     //false(可以被转换成数值 1)
   ```

---

### 再来看一张图：

![Thanks for inventing Javascript](https://pic3.zhimg.com/v2-80f03dfe036ad4ff0e37150aa7938994_1200x500.jpg)

如果被这个人猥琐的笑容吓到了可以先看最下面的《JavaScript 高级程序设计》原理部分。

### 下面对图上的内容进行分析

```JavaScript
>   typeof NaN
<·  "number"
```

上面已经提到，在其他编程语言中，任何数值除以 0 都会导致错误，从而停止代码执行。但在 ECMAScript 中，任何数值除以 0 会返回 NaN (原书如此，但实际上只有 0 除以 0 才会返回 NaN，正数除以 0 返回 Infinity，负数除以 0 返回-Infinity)，而其被定义为 number 类型。

```JavaScript
>   9999999999999999
<·  10000000000000000
>   0.5 + 0.1 == 0.6
<·  true
>   0.1 + 0.2 == 0.3
<·  false
```

这个是 JavaScript 的坑，如果非要究其原因，可以看这篇文章：[js 中 0.1+0.2 为什么不等于 0.3][4]。

PS：在后面的幂大于 20 的时候会显示成科学计数法：

```JavaScript
>   999999999999999990000
<·  1e+21
```

上部分的实际结果：

```JavaScript
>   0.5 + 0.1
<·  0.6
>   0.1 + 0.2
<·  0.30000000000000004
```

```JavaScript
>   Math.max()
<·  -Infinity
>   Math.min()
<·  Infinity
```

Math.max() 函数返回一组数中的最大值。
如果没有参数，则结果为 -Infinity。
如果有任一参数不能被转换为数值，则结果为 NaN。
引用自[MDN][5]。

我的理解是没有参数时，需要比较的一组值就是空，那么空里面的最大值就是-Infinity，Math.min()同理（个人理解，如有错误请指正）。

```JavaScript
>   [] + []
<·  ""
>   [] + {}
<·  "[object Object]"
>   {} + []
<·  0
>   true + true + true === 3
<·  true
>   true - true
<·  0
>   true == 1
<·  true
>   true === 1
<·  false
>   (! + [] + [] + ![]).length
<·  9
>   9 + "1"
<·  "91"
>   91 - "1"
<·  90
>   [] == 0
<·  true
```

这里的大部分运算结果涉及的类型转化可以参考《JavaScript 高级程序设计》，文末也有摘抄。

```JavaScript
>   true + true + true === 3
<·  true
>   true - true
<·  0
>   true == 1
<·  true
>   true === 1
<·  false
```

这几个运算可能和书上写的有些偏差，_“如果有一个操作数是对象、数值或布尔值，则调用它们的 toString()方法取得相应的字符串值，然后再应用前面关于字符串的规则”_，——如果是布尔值加减操作，true 转为 1，false 转为 0。

```JavaScript
>   true + false
<·  1
```

再看这个

```JavaScript
>   [] + {}
<·  "[object Object]"
>   {} + []
<·  0
```

`[] + {}`可以理解是调用了各自的 toString()方法后再应用字符串相加的规则.

```
>   [].toString()
<·  ""

>   var obj = {}
<·  undefined
>   obj.toString()
<·  "[object Object]"
相加结果得到"[object Object]"
```

`{} + []`为什么结果是 0？
实际上是控制台把`{}`当做了一个空白表达式，实际上是在计算`+ []`。一元加运算符优先把右边的参数转化为 number，就得到了`0`。如果是上面的`obj +  []`得到的结果就和`[] + {}`一样都是`"[object Object]"`

**着重看一下这个例子：**
`(! + [] + [] + ![]).length`
首先，逻辑非!有着极高的优先级，所以首先计算的是`! + []`和`![]`。
`+ []`: + 运算符将[]转化为 number 结果为 0，`![]`结果为`false`。
式子变成了`(true + [] + false).length`
`[].toString()`为""，`true + ""`为`"true"`，`"true" + false`为`"truefalse"`.
`"truefalse"`长度为 9。

---

### 《JavaScript 高级程序设计》：

#### 加性操作符

加法 加法操作符(+)的用法如下所示:

```JavaScript
var result = 1 + 2;
```

- 如果两个操作符都是数值，执行常规的加法计算，然后根据下列规则返回结果:
- 如果有一个操作数是 NaN，则结果是 NaN;
- 如果是 Infinity 加 Infinity，则结果是 Infinity;
- 如果是-Infinity 加-Infinity，则结果是-Infinity;
- 如果是 Infinity 加-Infinity，则结果是 NaN;
- 如果是+0 加+0，则结果是+0;
- 如果是+0 加-0，则结果是+0。
  不过，如果有一个操作数是字符串，那么就要应用如下规则:
- 如果两个操作数都是字符串，则将第二个操作数与第一个操作数拼接起来;
- 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来。  
  如果有一个操作数是对象、数值或布尔值，则调用它们的 toString()方法取得相应的字符串值，
  然后再应用前面关于字符串的规则。对于 undefined 和 null，则分别调用 String()函数并取得字 符 串"undefined"和"null"。

减法 减法操作符(-)是另一个极为常用的操作符，其用法如下所示:

```JavaScript
var result = 2 - 1;
```

与加法操作符类似，ECMAScript 中的减法操作符在处理各种数据类型转换时，同样需要遵循一些特殊规则，如下所示:

- 如果两个操作符都是数值，则执行常规的算术减法操作并返回结果;
- 如果有一个操作数是 NaN，则结果是 NaN;
- 如果是 Infinity 减 Infinity，则结果是 NaN;
- 如果是-Infinity 减-Infinity，则结果是 NaN;
- 如果是 Infinity 减-Infinity，则结果是 Infinity;
- 如果是-Infinity 减 Infinity，则结果是-Infinity;
- 如果是+0 减+0，则结果是+0;
- 如果是+0 减-0，则结果是-0;
- 如果是-0 减-0，则结果是+0;
- 如果有一个操作数是字符串、布尔值、null 或 undefined，则先在后台调用 Number()函数将其转换为数值，然后再根据前面的规则执行减法计算。如果转换的结果是 NaN，则减法的结果就是 NaN;
- 如果有一个操作数是对象，则调用对象的 valueOf()方法以取得表示该对象的数值。如果得到的值是 NaN，则减法的结果就是 NaN。如果对象没有 valueOf()方法，则调用其 toString()方法并将得到的字符串转换为数值。

---

#### 相等和不相等

ECMAScript 中的相等操作符由两个等于号(==)表示，如果两个操作数相等，则返回 true。而不相等操作符由叹号后跟等于号(!=)表示，如果两个操作数不相等，则返回 true。这两个操作符都会先转换操作数(通常称为强制转型)，然后再比较它们的相等性。

在转换不同的数据类型时，相等和不相等操作符遵循下列基本规则:

- 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为 0，而 true 转换为 1;
- 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值;
- 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类型值按照前面的规则进行比较;
  这两个操作符在进行比较时则要遵循下列规则：
- null 和 undefined 是相等的。
- 要比较相等性之前，不能将 null 和 undefined 转换成其他任何值。

> PS：简要带几句 undefined 和 null 的区别，想要深入理解可以自行查询，这类文章也挺多的。
> null 和 undefined 都表示“值的空缺”，你可以认为 undefined 是表示系统级的、出乎意料的或类似错误的值的空缺，而 null 是表示程序级的、正常的或在意料之中的值的空缺。可以认为 undefined 表示本该有却没有，null 是本来就没有。undefined 是未初始化的变量，null 是一个空指针对象。佛语有云：“色即是空，空即是色”，“色”想要有却没有，“空”本就是空，指针为空，对象为空。然而“色即是空，空即是色”，undefined == null 也成立，不是风动，不是幡动，忍者心动。

- 如果有一个操作数是 NaN，则相等操作符返回 false，而不相等操作符返回 true。重要提示：即使两个操作数都是 NaN，相等操作符也返回 false;因为按照规则，NaN 不等于 NaN。
- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true;否则，返回 false。
- 下表列出了一些特殊情况及比较结果：

![相等和不相等](https://image-static.segmentfault.com/325/605/3256052082-5c8b5eab37e62_articlex)

---

&nbsp;

**参考：**

1. 《JavaScript 高级程序设计》
2. [JavaScript 神奇之旅][6]

**在下才疏学浅，如发现错误，请批评指正！**

[4]: http://coolcao.com/2016/10/12/js%E4%B8%AD0-1-0-2%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E7%AD%89%E4%BA%8E0-3/
[5]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max
[6]: https://zhuanlan.zhihu.com/p/38920837

&nbsp;
&nbsp;
