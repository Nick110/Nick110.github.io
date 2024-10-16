---
title: JavaScript中的继承
author: 杨少侠
createTime: 2024/06/07 14:44:14
permalink: /article/eap7jozo/
tags:
  - 前端
---

# JavaScript中的继承

## 构造函数、原型和实例的关系
- 每个构造函数都有一个`prototype`属性指向原型对象
- 所有原型对象自动获得一个名为`constructor`的属性，指回与之关联的构造函数
- 原型链的顶端是`null`，`Object.prototype`的隐式原型`__proto__`指向`null`

<!-- more -->

![image](https://github.com/Nick110/8-legged-essay/assets/30553189/181e2653-fd9e-4a3d-bbd1-a80c6974bb1b)


## 1. 原型链继承

> 将子类的构造函数的prototype指向父类的实例，这样就在实例和原型之间构造了一条`原型链`

```JavaScript
// 定义 Person 构造函数
function Person() {
  this.name = 'CoderBin'
}

// 给 Person 的原型上添加 getPersonValue 方法（原型方法）
Person.prototype.getPersonValue = function() {
  return this.name
}

// 定义 Student 构造函数
function Student() {
  this.sno = '001'
}

// 继承 Person — 将 Peson 的实例赋值给 Student 的原型
Student.prototype = new Person()

Student.prototype.getStudentValue = function() {
  return this.sno
}

// 实例化 Student
let stu = new Student()

console.log(stu.getPersonValue()) // CoderBin
```

![图解原型链继承](https://static.hzpdex.com/web/1728555527936_cb91633be9244ecaa7b3e5a782c90fe8~tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.jpg)

### 原型与继承的关系

#### instanceof
> 如果一个实例的原型链中出现过相应的构造函数，则`instanceof`返回`true`

```JavaScript
console.log(stu instanceof Object)    // true
console.log(stu instanceof Person)    // true
console.log(stu instanceof Student)   // true
```

#### isPrototypeOf()
> 只要原型链中包含这个原型，这个方法就返回`true`
```JavaScript
console.log(Object.prototype.isPrototypeOf(stu))    // true
console.log(Person.prototype.isPrototypeOf(stu))    // true
console.log(Student.prototype.isPrototypeOf(stu))   // true
```

<font color="red">注意：以对象字面量方式创建原型方法会破坏之前的原型链，因为这相当于重写了原型链。下面是一个例子：</font>

```JavaScript
// 定义 Person 构造函数
function Person() {
  this.name = 'CoderBin'
}

// 给 Person 的原型上添加 getPersonValue 方法（原型方法）
Person.prototype.getPersonValue = function() {
  return this.name
}

// 定义 Student 构造函数
function Student() {
  this.sno = '001'
}

// 继承 Person
Student.prototype = new Person()

// 通过对象字面量添加新方法，这会导致上一行无效！！！
Student.prototype = {
  getStudentValue() {
    return this.sno
  },
  someOtherMethod() {
    return 'something'
  }
}

// 实例化 Student
let stu = new Student()

console.log(stu.getPersonValue())  // TypeError: stu.getPersonValue is not a function
```
> 在这段代码中，子类的原型在被赋值为 Person 的实例后，又被一个对象字面量覆盖了。覆盖后的原型是一个Object 的实例，而不再是 Person 的实例。因此之前的原型链就断了。Student 和 Person 之间也没有关系了。

### 原型链继承的弊端
<font color="red">原型属性是共享的</font>

主要问题出现在原型中包含引用值（简单类型也会）的时候。前面在谈到原型的问题时也提到过，原型中包含的引用值会在所有实例间共享，这也是为什么属性通常会在构造函数中定义而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个类型的实例。这意味着原先的实例属性摇身一变成为了原型属性。下面的例子揭示了这个问题：
```JavaScript
// 定义 Person 构造函数
function Person() {
  this.letters = ['a', 'b', 'c']
}

// 定义 Student 构造函数
function Student() {
  this.sno = '001'
}

// 继承 Person
Student.prototype = new Person()

let stu1 = new Student()
let stu2 = new Student()

stu1.letters.push('d')

console.log(stu1.letters)  // ['a', 'b', 'c', 'd']
console.log(stu2.letters)  // ['a', 'b', 'c', 'd']
```

## 2. 盗用构造函数继承

> 在子类构造函数中调用父类构造函数

```JavaScript
// 定义 Person 构造函数
function Person() {
  this.letters = ['a', 'b', 'c']
}

// 定义 Student 构造函数
function Student() {
  // 继承 Person — 使用 call() 方法调用 Person 构造函数
  Person.call(this)
}

let stu1 = new Student()
let stu2 = new Student()

stu1.letters.push('d')

console.log(stu1.letters)  // ['a', 'b', 'c', 'd']
console.log(stu2.letters)  // ['a', 'b', 'c']
```

### 传递参数
```JavaScript
// 定义 Person 构造函数
function Person(name) {
  this.name = name
}

// 定义 Student 构造函数
function Student(name) {
  // 继承 Person
  Person.call(this, name)
  // 实例属性
  this.age = 18
}

let stu = new Student('CoderBin')

console.log(stu.name)   // CoderBin
console.log(stu.age)     // 18
```

### 缺陷
盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。由于存在这些问题，盗用构造函数基本上也不能单独使用。

## 3. 组合式继承
> 组合继承 （有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思路是：<font color="red">使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。</font>

```JavaScript
// 定义 Person 构造函数
function Person(name) {
  this.name = name
  this.letters = ['a', 'b', 'c']
}

// 在 Person 的原型上添加 sayName 方法
Person.prototype.sayName = function() {
  console.log(this.name + ' 你好~')
}

// 定义 Student 构造函数
function Student(name, age) {
  // 继承属性
  Person.call(this, name)
  this.age = age
}

// 继承方法
Student.prototype = new Person()

// 在 Student 的原型上添加 sayAge 方法
Student.prototype.sayAge = function() {
  console.log(this.age)
}

let stu1 = new Student('CoderBin', 18)
let stu2 = new Student('Bin', 23)

stu1.letters.push('d')

// 输出 stu1 的信息
console.log(stu1.letters)   // [ 'a', 'b', 'c', 'd' ]
stu1.sayName()               // CoderBin 你好~
stu1.sayAge()                 // 18

// 输出 stu2 的信息
console.log(stu2.letters)   // [ 'a', 'b', 'c']
stu2.sayName()               // Bin 你好~
stu2.sayAge()                 // 23
```

## 4. 原型式继承

```JavaScript
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```
> 本质上，object() 是对传入的对象执行了一次浅复制。

```JavaScript
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

let person = {
  name: 'CoderBin',
  letters: ['a', 'b', 'c']
}

let p1 = object(person)
let p2 = object(person)

p1.name = 'p1'
p1.letters.push('d')

p2.name = 'p2'
p2.letters.push('e')

console.log(person.letters)   // [ 'a', 'b', 'c', 'd', 'e' ]
```

### 等价于Object.create()

> ECMAScript5 通过增加Object.create()方法将原型式继承的概念规范化了。这个方法接收两个参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时，Object.create() 与这里的object()方法效果相同

```JavaScript
let person = {
  name: 'CoderBin',
  letters: ['a', 'b', 'c']
}

let p1 = Object.create(person)
let p2 = Object.create(person)

p1.name = 'p1'
p1.letters.push('d')

p2.name = 'p2'
p2.letters.push('e')

console.log(person.letters)   // [ 'a', 'b', 'c', 'd', 'e' ]
```

> 原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住，<font color="red">属性中包含的引用值始终会在相关对象间共享</font>，跟使用原型模式是一样的。

## 5.寄生式继承

```JavaScript
function inheritPrototype(o) {
  let clone = Object.create(o)  // 通过调用函数创建一个新对象
  clone.sayHi = function() {     // 以某种方式增强这个对象
    console.log('Hi~')
  }
  return clone  // 返回这个对象
}

let person = {
  name: 'CoderBin',
  letters: ['a', 'b', 'c']
}

let p1 = inheritPrototype(person)
p1.sayHi()  // Hi~
```

<font color="red">注意：通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。</font>

## 6.寄生组合式继承

> 组合式继承存在一个问题：父类构造函数始终会被调用两次：一次在是创建子类原型时调用，另一次是在子类构造函数中调用。本质上，子类原型最终是要包含超类对象的所有实例属性，子类构造函数只要在执行时重写自己的原型就行了。

> 实际上通过组合式继承会创建两组属性，一组在实例上，另一组在原型上, 只不过实例属性会遮蔽原型上同名的属性。这是调用两次父类构造函数的结果。

### 解决办法
> 寄生式组合继承通过`盗用构造函数继承属性，但使用混合式原型链继承方法`。基本思路是不通过调用父类构造函数给子类原型赋值，`而是取得父类原型的一个副本`。说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型

```JavaScript
function inheritPrototype(subType, superType) {
  let prototype = Object.create(superType.prototype)   // 创建对象
  prototype.constructor = subType                             // 增强对象
  subType.prototype = prototype                               // 赋值对象
}
```
`inheritPrototype`函数接收两个参数：子类构造函数和父类构造函数
分三步：
1. 创建一个父类原型的副本
2. 将此副本的constructor指向子类的构造函数
3. 将子类的prototype指向该副本

```JavaScript
// 定义 Person 构造函数
function Person(name) {
  this.name = name
  this.letters = ['a', 'b', 'c']
}

// 在 Person 的原型上添加 sayName 方法
Person.prototype.sayName = function() {
  console.log(this.name)
}

// 定义 Student 构造函数
function Student(name, age) {
  Person.call(this, name)
  this.age = age
}
// 调用 inheritPrototype() 函数，传入 子类构造函数 和 父类构造函数
inheritPrototype(Student, Person)

// 在 Person 的原型上添加 sayAge 方法
Student.prototype.sayAge = function() {
  console.log(this.age)
}

let stu = new Student('CoderBin', 18)

console.log(stu)
// 输出：Student { name: 'CoderBin', letters: [ 'a', 'b', 'c' ], age: 18 }

console.log(Student.prototype)
// 输出
// Person {
//   constructor: [Function: Student],
//   sayAge: [Function (anonymous)]   
// }
```

> 这里只调用了一次`Person`构造函数，避免了`Student.prototype`上不必要也用不到的属性，因此可以说这个例子的效率更高。而且，原型链仍然保持不变，因此`instanceof`操作符和`isPrototypeOf()`方法正常有效。`寄生式组合继承`可以算是引用类型继承的最佳模式。

## new 操作符做了哪些事情
> MDN 中对 new 的描述: 使用 `new` 来构建函数，会执行如下四部操作：

1. 创建一个空的简单JavaScript对象（即 {}）
2. 为步骤1新创建的对象添加属性`proto`，将该属性链接至构造函数的原型对象
3. 将步骤1新创建的对象作为`this`的上下文，执行构造函数方法
4. 如果该函数没有返回对象，则返回`this`
