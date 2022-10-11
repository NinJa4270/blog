### 父子组件创建与挂载顺序
![](%E7%BB%84%E4%BB%B6%E6%8C%82%E8%BD%BD%E8%BF%87%E7%A8%8B.drawio.png)

------

1. 父组件定义好 `updateComponent = vm._update(vm.render())`
2. 实例化`render watcher` 并将`updateComponent`作为它的`getter`
   1. 渲染`wather`实例化阶段会执行 `this.get`
   2. `this.get`会执行`getter` 进入到 `_update`方法
3. `_update` 通过参数不同 调用`patch` 执行更新或首次挂载逻辑
4. `patch` 
   1. 接收参数 `oldVnode vnode`
   2. 因为组件首次挂载 `oldVnode` 一定会是真实的 `Dom` 元素
   3. 因此 以这个真实的`Dom`去创建一个空的`vnode` 赋值给oldVNode
   4. 再根据传入的 `vnode`创建 `dom树`
5. `createElm` 创建真实 `Dom`
   1. 判断 传入的 `vnode`是否为组件
   2. 如果不是组件 则通过 `createChildren` 创建子节点
      1. 遍历`children` 递归调用 `createElm`
   3. 否则 创建组件 `createComponent`
      1. 执行 `render helper`定义的 `componentVNodeHooks init` 
      2. 执行`init`这个方法，再通过`createComponentInstanceForVnode`进行组件的实例化
      3. 最终调用的是 `new vnode.componentOptions.Ctor(options)` 进行实例化 执行 `Vue`构造函数的`_init`进行初始化
      4. 进行执行生命周期钩子 `beforeCreate created beforeMounte mounted`
      5. 最后执行`$mount`，将其挂载到 父组件的 `elm`上。
6. 所有节点执行完成后都挂载到了`elm`上, 此时删除旧的节点,将 `elm` 插入到 `body`中。