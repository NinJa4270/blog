### Event Loop

```js
    async function promise1() {
        console.log("promise1  start")
        await promise2()
        console.log("promise1  end")
    }
    function promise2() {
        console.log("promise2")
    }
    setTimeout(function () {
        console.log("setTimeout")
    }, 0)
    console.log("script start")
    promise1()
    new Promise((resolve, reject) => {
        console.log("Promise")
        resolve()
    }).then(function () {
        console.log("Promise then")
    })
    console.log("script end")
```

1.  整个JS代码执行是一个宏任务
2.  先遇到了 `setTimeout` 叫其回调放入 **延迟队列**
3.  遇到 `console.log('script start')` **输出 "script start"**
4.  遇到 `promise1()`进入函数执行
5.  该函数被 `async` 标记， **`JS`引擎保存当前调用栈信息，创建协程，并将主线程的控制权 交给 协程**，
6.  **协程**执行内部函数。
7.  遇到 `console.log("promise1  start")` **输出 `promise1  start`**
8.  遇到 `await promise2()` 执行 promise2 函数
9.  遇到 `console.log("promise2")`  **输出`promise2`**
10.  执行结束后，**`JS`引擎保存当前调用栈信息，并将主进程控制权 还给 父协程** 回到刚执行 `promise1`的位置
11.  返回执行，遇到 new Promise
12.  遇到 `console.log("Promise")`  **输出`Promise`**
13.  遇到 `resolve()` 放入微任务队列中 退出 new Promise
14.  遇到 `console.log("script end")` **输出`script end`**
15.  执行结束后，**`JS`引擎保存当前调用栈信息，并将主进程控制权 再次还给 协程** 回到刚执行 ` await promise2()`的位置后面
16.  遇到 `console.log("promise1  end")`   **输出`promise1  end`** 并退出 promise1函数
17.  发现没有可执行的同步代码 开始检查微任务队列
18.  执行 `.then()` 中的 ` console.log("Promise then")`  **输出`Promise then`**
19.  发现微任务队列为空 开始检查宏任务
20.  执行 `setTimeout`   **输出`setTimeout`**
21.  最终结果为 `script start => promise1  start => promise2 => Promise => script end => promise1  end => Promise then => setTimeout`