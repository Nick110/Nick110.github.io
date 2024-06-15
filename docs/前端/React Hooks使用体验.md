---
title: React Hooks使用体验
author: 杨少侠
createTime: 2020/10/25 23:20:58
permalink: /article/u73ss7ze/
tags:
  - 前端
---

## 什么是 React Hooks?

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

<!-- more -->

## 为什么使用 React Hooks?

React 的设计思想可以用`UI = f(data)`这个公式来描述，数据驱动界面，页面是由 f 函数接收 data 来决定他最终的呈现 UI。f 起到了至关重要的作用。  
React 是以组件为粒度来编写应用，组件就是这个 f。  
在 16.8 之前，一个有自己状态的组件都是 class 组件。

```JavaScript
// React基于Class设计组件
class MyConponent extends React.Component {
  // 组件接收来自外界的状态：props
  constructor(props) {
    super(props);
    // 组件自身的状态：state
    this.state = {

    }
  }

  // 生命周期
  componentWillUnmount() {
    console.log('WillMount');
  }

  componentDidMount() {
    console.log('DidMount');
  }

  // 渲染函数
  render() {
    return (
      <div>
        我是class组件
      </div>
    );
  }
}

```

一个 class 组件，其中：`class MyConponent extends React.Component`,
`constructor(props) {
    super(props);
    this.state = {
    }
  }
`,
`render() { }`等都是重复累赘的与组件无关的代码，另外，class 组件中令人复杂的 this 指向问题都是他的不可避免的缺陷。

---

在一个应用中，肯定会有功能类似的点，这种情况下把相同的逻辑提取出来，达到复用的目的，降低耦合。

在 Hooks 之前，React 实现状态逻辑复用的方法有高阶组件（HOC）和 Render Porps。

```JavaScript
// Render Props例子：

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
    };
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.vislble
    })
  }

  render() {
    return (
      <div>
        {this.props.children({this.state.on, this.toggle})}
      </div>
    )
  }
}
// 分割线
import Toggle from './toggle'

function App() {
  return (
    <Toggle>
      {({ on, toggle }) => (
        <Button type="primary" onClick={toggle}>Open Modal</Button>
        <Modal visible={on} onOk={toggle} onCancel={toggle} />
      )}
    </Toggle>
  )
}

// 将渲染（render）作为一个属性传入，抽离了逻辑处理和展示型组件，这样Toggle就可以拿来复用

```

这两种模式都是通过把逻辑抽离到一层父组件中，这样会导致组件层级嵌套地狱的问题

Hooks 的版本：

```JavaScript
function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}

```

总结：

- class 组件的代码过于冗余
- class 组件中难以理解的 this 指向问题
- 现有的逻辑复用解决方法（RenderProps，高阶组件）会造成组件层级嵌套地狱

Hooks 的优点：

- 相当于是一个拉平的 Render Props，在 function 组件中随时都可以创建一个值，并且修改它，并且代码更简洁，清爽
- Hooks 可以引用其他 Hooks
- 更容易将组件的 UI 与状态分离，状态与 UI 的界限会越来越清晰

## 如何使用 Hooks？

### 1. useState

```JavaScript
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  // 初始值为0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

> 摘抄自官网：useState 就是一个 Hook。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

#### 注意

```JavaScript
const [age, setAge] = useState(20);
const [fruit, setFruit] = useState('banana');
const [sex, setSex] = useState('male');
```

当有多个 state 的时候，React 是如何保证每个 state 的独立性呢？
react 是根据 useState 出现的顺序来定的。
所以需要注意的是：`不要在条件语句中setState`

```JavaScript
const [age, setAge] = useState(42);
if (a === 1) {
  const [fruit, setFruit] = useState('banana');
}
const [sex, setSex] = useState('male');
```

这样会导致

```JavaScript
//第一次渲染
useState(42);  //将age初始化为20
useState('banana');  //将fruit初始化为banana
const [sex, setSex] = useState('male'); //...

//第二次渲染
useState(42);  // 读取状态变量age的值（这时候传的参数20直接被忽略）
// useState('banana'); // 条件不满足不会执行
const [sex, setSex] = useState('male'); // 读取到的却是状态变量fruit的值，导致报错
```

参考：[30 分钟精通 React Hooks](https://juejin.im/post/6844903709927800846#heading-9)

### 2. useEffect

顾名思义，useEffect 就是处理副作用的 Hook，例如请求数据，设置文档标题，调整视图尺寸……
useEffect 在每次渲染时都会执行，因此，他接收的第二个参数是一个依赖数组，只有当依赖的值改变时，才会执行第一个参数传入的函数。
因为 useEffect 的特点，可以用它来模仿 class 组件的生命周期。

```JavaScript
function App(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
    	window.document.title = `count的值是${count}`;
    }, [count]);
    // 只有count值变化时才会重新执行window.document.title = `count的值是${count}`，依赖值传空数组就只会执行一次，相当于componentDidMount
}
```

如果想要像 componentWillUnmount 一样取消一些事件 useEffect 能做到吗？
可以在第一个函数参数里 return 一个函数，这个函数会在下一次渲染之后重新执行，比如清除定时器之类的操作。

```JavaScript
useEffect(() => {
    console.log('use effect...', count);
    const timer = setInterval(() => setCount(count +1), 1000);
    return () => clearInterval(timer);
});

```

### 3. useDispatch, useSelector

以往在 class 组件中获取 redux 的值时，都是采取 connect 高阶组件的方式，相较之下，useDispatch 和 useSelector 使用起来会更加方便

```JavaScript
function App(props) {
	// 获取到state中的user
    const user  = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
    	<Button onClick={() => dispatch({type: 'increment', payload: 1})}>+</Button>
    )
}
```

### 4. useMemo

`useCallback(fn, deps) === useMemo(() => fn, deps)`  
useMemo 相当于 PureComponent 和 React.memo，会对依赖值进行一次浅比较，当发生差异时才会重新渲染。
useMemo 的使用场景是得到一些值需要经过开销较大，耗时的操作。

```JavaScript
const num = useMemo(() => {
  let num = 0;
  // 这里使用 count 针对 num 做一些很复杂的计算，当 count 没改变的时候，组件重新渲染就会直接返回之前缓存的值。
  num = fibonacci(start) // 缓存耗时操作
  return num;
}, [start]);

return <div>{num}</div>
```

useMemo 非常类似于 Vue 中的 computed

> 记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

### 5. useCallback

`useCallback(fn, deps) 相当于 useMemo(() => fn, deps)`  
useMemo 缓存一个值，useCallback 缓存一个函数  
简单来说就是返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数）

```JavaScript
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

> 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。

### 6. ……

useRef、useContext、useReducer……

### 7. 自定义 Hooks

利用 React 提供的内置 Hooks，我们可以根据自己的具体需求来定制多样化的 Hooks。  
例如：监听窗口尺寸的变化的 Hooks

```JavaScript
function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  };
}

function useWindowSize() {
  let [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
```

## 注意事项

### 1. 当有多个变量时，使用多个 state 还是单个 state？

```jsx
// 一般情况下每个state都要声明一次
const [width, setWidth] = useState(100);
const [height, setHeight] = useState(100);
const [left, setLeft] = useState(0);
const [top, setTop] = useState(0);
// 分割线
// 同时也可以像这样使用
const [state, setState] = useState({
  width: 100,
  height: 100,
  left: 0,
  top: 0,
});
```

如果使用下面这种方式，setState 时新的 state 会覆盖之前的 state，所以每次需要合并之前的 state，当然也可以自定义一个 hooks 实现 state 的更新。
使用多个 state 可以使变量的粒度更细。每次有状态的更新只需更新某个就够了。

除此之外，还可以使用如下方式：

```jsx
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
// 分割线
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: "add", text });
  }

  // ...
}
```

Hooks API 已经将`useReducer`内置

`考虑到state的粒度问题，一般情况下，完全不相关的state可以单独state，如果有多个state相互关联，你变我肯定变，就可以set到同一个state中。`

### 2. 什么时候该使用 useMemo 和 useCallback？

useMemo 中我们需要的值也是需要经过执行来得到的，他的作用是在依赖值没有变化时就可以不用执行这个复杂的开销大的计算，直接取到上一次计算好的值。但是如果每一个简单操作的函数都包一层 useMemo 的话，那就得不偿失了，因为对依赖值的比较也是一个开销，此时就需要做一个权衡，最重的目的都是消耗最少，尽可能的优化。

## 参考链接

- [React Hooks](https://react.docschina.org/docs/hooks-intro.html)
- [一篇看懂 React Hooks](https://zhuanlan.zhihu.com/p/50597236)
- [详解 useCallback & useMemo](https://juejin.im/post/6844904101445124110)

<br />
