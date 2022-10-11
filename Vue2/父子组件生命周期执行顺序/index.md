### 父子组件创建与挂载顺序
```
// 父子组件的首次挂载生命周期执行顺序是
父beforeCreate => 父created => 父beforeMount => 
子beforeCreate => 子created => 子beforeMount => 子mounted => 
父mounted											   
```

```
// 子组件是异步组件 父子组件的首次挂载生命周期执行顺序是
父beforeCreate => 父created => 父beforeMount => 父mounted => 	
子beforeCreate => 子created => 子beforeMount => 子mounted 
```

```
// 父子组件的更新生命周期执行顺序是
父beforeUpdated =>
子beforeUpdated => 子updated =>
父updated
```

```
// 父子组件的销毁生命周期执行顺序是
父beforeDestroy =>
子beforeDestroy => 子destroyed =>
父destroyed
```
------