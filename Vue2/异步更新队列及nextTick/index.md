### Vue的异步队列更新机制 以及nextTick
![](%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97.drawio.png)

1. 异步队列更新的入口
   1. 当响应式数据setter触发时，会执行 `dep.notify`, `dep`中的`subs`是订阅当前`dep`的所有`watcher`实例
   2. 进而使所有订阅者执行`watcher.update`方法
      1. 如果是懒加载（`computed`）只设置 `this.dirty = true` 表示当前值已经被改变
      2. 同步情况执行 `this.run`
      3. 否则执行`queueWatcher(this)` 这也是异步队列更新的入口
2. `queueWatcher`
   1. 将接收到的`watcher`先判断是否存在 以防止重复保存到 `queue`队列中
   2. 如果当前 `flushing` 
      1. `false` 表示当前 `flushSchedulerQueue`没有在执行 直接将 `watcher` `push`到 `queue` 中。
      2. `true` 表示正在执行 `flushSchedulerQueue` 因为`flushSchedulerQueue` 会对 `queue` 排序后执行 此时将要存入的 `watcher` 通过其创建的顺序 `watcher.id`存入到 `queue` 中。
   3. 如果 `wating` 为 `false` (`wating标识` 表示 `callbacks`中是否存在 `flushSchedulerQueue` 函数 只能存在一个)
      1. 将 `wating` 置为 `true ` （表示已经存在 不允许再添加了）
      2. 执行 `nextTick(flushSchedulerQueue)`
3. `nextTick(cb)`
   1. `nextTick`接收的的 `cb`不仅仅只有 `flushSchedulerQueue`这个刷新 `queue` 队列的函数，还有用户编写的`this.$nextTick(cb) Vue.nextTick(cb)`的回调
   2. 将接收的回调 通过`try catch`包裹 `push`到 全局的 `callbacks` 中
   3. 当`pending` 为 `false` 时 ( `pending标识` 表示浏览器任务队列中是否存在`flushCallbacks`函数 )
      1. 将 `pending` 置为 `true` （表示已经存在 正在进行中 不允许再添加了）
      2. 再执行 `timerFunc`
4. `timerFunc`
   1. `Promise.resolve().then(flushCallbacks)`
   2. `new MutationObserver(flushCallbacks)`
   3. `() =>  setImmediate(flushCallbacks)`
   4. `() =>  setTimeout(flushCallbacks)`
5. `flushCallbacks`
   1. 将 `pending`设置为 `false` （表示浏览器任务队列中不存在 `flushCallbacks` 可以添加了）
   2. 遍历执行 `callbacks` 中的回调函数
6. `flushSchedulerQueue`
   1. 对 `queue` 进行排序 排序的原因
      1. 父组件总是先与子组件创建。如果顺序错误，子组件将会更新两次，造成性能损耗。
      2. 因为 `user watcher`总是先与 `render watcher`创建。因此要保证触发顺序。
      3. 如果一个组件的 `watcher` 在他父组件销毁期间运行，如果保证顺序，就可以跳过这个`watcher`。
   2. 遍历 `queue` 执行每一个 `watcher.run` 并清空 `queue`