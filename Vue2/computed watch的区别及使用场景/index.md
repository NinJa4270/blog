### computed/watch的区别及使用场景
1.  `computed/watch` 本质都是一个 `watcher`
2.  `computed` `computedWatcher`
    1.  `computed` 在 `new Watcher`时 多个一个配置项 `lazy:true`
    2.  存在`lazy`为`true`时,实例化`Watcher`不会调用 `get`方法 获取`value`,`dirty`继承这个`lazy`属性
    3.  配合`dirty`属性 判断数据是否为脏数据（表示数据是否过期）
    4.  然后在 `computed` 触发`getter`时, 会判断 `dirty`的值为 `true`
    5.  此时再通过 `watcher.evaluate` 调用 `watcher.get`来获取 `value`
    6.  再将 `dirty` 设置为 `false`
    7.  再值未发生变化时，再触发`computed getter`,`dirty` 为 `false` 就不再执行 `watcher.evaluate` 而是直接返回 `watcher.value`
3.  `watch` `user watcher` `$watch`
4.  场景:
    1.  当模版中某个值通过一个或多个数据计算得到结果时，可以使用 `computed`
    2.  当需要再某个值发生变化时进行某些操作，可以使用 `watch`