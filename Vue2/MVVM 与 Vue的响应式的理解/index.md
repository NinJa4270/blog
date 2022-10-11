### MVVM 与 Vue的响应式的理解
1.  响应式就是可以监测到数据变化，进而对这些变化做出某些操作。
2.  `MVVM` 框架的核心就是，解决视图层与数据层的连接问题。通过数据驱动视图更新。
3.  `Vue` 就是通过 `数据响应式` 和 `虚拟DOM`,通过`diff patch`，来连接视图层与数据层，使用户只需要关心业务，不必频繁的进行 `DOM` 操作。
    1.  以 data 为例
    2.  在初始化阶段 (`_init`) 会执行 `initState()` 然后会对 `data`进行监听(`observe`)
    3.  遍历 `data` 的 `key` 通过 `proxy()` 将 `_data` 代理到组件实例上
    4.  对 `data` 进行 `observe` 方法
    5.  然后对 `data`对象整体 实例化一个 `Observer`
        1.  这里会进行 `value` 的判断
        2.  如果是对象 执行 `walk` 如果是数组 重写数组的7个方法 并执行 `observeArray`
    6.  在实例化 `Observer` 中，为`data`实例化一个Dep 再进行 `walk()`
    7.  `walk`方法中 会对 `data` 的每一个 `key value` 进行 `defineReactive(data,key)`
    8.  `defineReactive`方法中 先创建一个 `key value` 专属的 `dep`  再进行一次 `observe`(4)
    9.  `observe` 会对 `value` 进行判断
    10. 如果是数组/对象 则实例化 `Observer`(6) 否则不做处理 (不需要递归进行监听了) 并返回一个 `observe` 实例 赋值给 `childOb`
    11. 再对`key value` 通过 `Object.defineProperty` 进行拦截
    12. 在 `getter` 中，会进行 `dep.depend` 如果存在 `childOb` 则执行 `childOb.dep.depend` 进行依赖收集
    13. 在 `setter` 中，会进行 `dep.notify` 并对新的值进行 `observe` 依赖通知更新
![](./vue%E5%93%8D%E5%BA%94%E5%BC%8F.drawio.png)