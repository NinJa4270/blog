### 组件通信的方式

1. 父子通信
   1. `props $emit`
   2. `provide inject`  ( 基本数据类型不具备响应式，如果是一个可监听对象，这个对象的key是具备响应式的 )
   3. `$parent $children`
   4. `$refs`
   5. `$attrs $listeners`
   6. `.sync $emit('update:xxx')` 双向绑定
2. 兄弟互相通信
   1. `vuex`
   2. `eventBus`
   3. 中转组件