### `data`为什么是一个函数
1.  定义时，在 `Vue组件` 在创建时会经历 `extend Vue构造函数` 这里面会进行一个 `mergeOptions` 选型合并。 此时会通过对data合并拦截 `strats.data方法`,如果 `childVal`也就是传入的 `data`不是一个函数，报错 `The "data" option should be a function that returns a per-instance value in component definitions.` 并直接返回 `parentVal`
2.  使用时，当组件可能存在多个实例, 实例的data会指向同一个地址，当改变一个组件的某个值时，另一个组件同样会发生变化。
3.  在`Vue _init`初始化阶段，通过`getData`会判断 `data`的类型，如果是函数 会直接执行data函数，返回一个新的对象。