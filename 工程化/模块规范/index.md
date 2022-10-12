## 模块规范

### 1. 文件划分
```js
// module-a.js
var a = 10
```

```js
// module-b.js
var a = 100
function add(num) {
    num++
}
```

```html
<html lang="en">
<body>
    <script src="./module-a.js"></script>
    <script src="./module-b.js"></script>
    <script>
        add(a)
    </script>
</body>

</html>
```
存在问题：
1.  变量名冲突。
2.  调试困难，变量都是全局的。
3.  管理困难，依赖关系以及加载顺序。

### 2. 命名空间

```js
// module-a.js
window.moduleA = {
    a: 10
}
```

```js
// module-b.js
window.moduleB = {
    a: 100,
    add(num) { 
        num++
    }
}
```

```html
<html lang="en">
<body>
    <script src="./module-a.js"></script>
    <script src="./module-b.js"></script>
    <script>
        moduleB.add(moduleA.a)
    </script>
</body>

</html>
```
存在问题：
1. 管理困难，依赖关系以及加载顺序。

### 3. IIFE 私有作用域

```js
// module-a.js
(function () {
    let data = "moduleA";

    function method() {
        console.log(data + "execute");
    }

    window.moduleA = {
        data,
        method: method,
    };
})();
```

```js
// module-b.js
(function () {
    let data = "moduleB";

    function method() {
        console.log(data + "execute");
    }

    window.moduleB = {
        method: method,
    };
})();
```

```html
<html lang="en">

<body>
    <script src="./module-a.js"></script>
    <script src="./module-b.js"></script>
    <script>
        console.log(moduleA.data);
        moduleB.method();
    </script>
</body>

</html>
```
存在问题：
1. 管理困难，依赖关系以及加载顺序。

### 4. CommonJS
1.  统一模块化代码规范
2.  实现模块加载器

```js
// module-a.js
var data = "hello world";
function getData() {
  return data;
}
module.exports = {
  getData,
};

// index.js
const { getData } = require("./module-a.js");
console.log(getData());
```

```js
// 转译
(function (exports, require, module, __filename, __dirname) {
  // 执行模块代码
  // 返回 exports 对象
});
```
存在问题：
1. 依赖 `nodejs` 实现, 无法直接在浏览器中使用。 (`browserify`支持 `cjs`)
2. 同步方式进行模块加载，在浏览器中会造成阻塞。


### 5. AMD
1. 异步模块定义规范
   
```js 
// 定义模块

// print.js
define(function () {
  return {
    print: function (msg) {
      console.log("print " + msg);
    },
  };
});

// main.js
define(["./print"], function (printModule) {
  printModule.print("main");
});

```

```js 
// 加载模块
// module-a.js
require(["./print.js"], function (printModule) {
  printModule.print("module-a");
});
```

1. 浏览器不支持，需要借助第三方 `loader` (`requireJS`)

### 6. UMD
一种兼容 `AMD` 与 `CommonJS` 的一种规范

### 7. ESM
1. ECMAScript 官方提出的模块化规范
2. 同时兼容 `nodejs` 和浏览器
```js
// main.js
import { methodA } from "./module-a.js";
methodA();

//module-a.js
export const methodA = () => {
  console.log("a");
};
```
```html
<html lang="en">
  <body>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```