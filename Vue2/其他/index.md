### 自定义指令

```js
Vue.directive('color',{
  bind(el,binding){
    // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    el.style.background = binding.value
  },
  inserted(...args){
    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  },
  update(...args){
    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
  },
  componentUpdated(...args){
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  },
  unbind(...args){
    // 只调用一次，指令与元素解绑时调用。
  }
})

<div v-color="color">测试指令</div>
```
------



### 递归组件/动态组件/异步组件/函数式组件

1. 递归组件

2. 动态组件  `:is`

   ```js
   const componentA = {
       template: "<div>componentA</div>"
   }
   
   const componentB = {
       template: "<div>componentB</div>"
   }
   
   const vm = new Vue({
       template: `<div>Parent<component :is="componentName" /></div>`,
       data() {
           return {
               componentName: componentA
           }
       },
       mounted() {
           this.componentName = componentB
       }
   }).$mount('#app')
   ```


   

3. 异步组件

   ```js
   const component = {
       template: "<div>正确渲染</div>",
   }
   const asyncComp = new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve(component)
           // reject(component)
       }, 5000);
   })
   const AsyncComponent = function () {
       return {
           component: asyncComp,
           error: {
               template: "<div>错误渲染</div>",
           },
           loading: {
               template: "<div>加载中...</div>",
           },
           delay: 200,
           timeout: 3000
       };
   
   
   };
   const vm = new Vue({
       template: "<div><AsyncComponent /></div>",
       components: {
           AsyncComponent: AsyncComponent
       }
   }).$mount('#app')
   ```

4. 函数式组件

   ```js
   const FunctionComponent = {
       functional: true,
       props: ['text'],
       render(createElement, context) {
           return createElement('div', context.props.text)
       }
   }
   const vm = new Vue({
       template: `<div>Parent<FunctionComponent text="函数式组件" /></div>`,
       components: {
           FunctionComponent
       },
   }).$mount('#app')
   ```
------

   

### keep-alive

1. `keep-alive`组件是内部组件，通过设置`abstract:true` 并不会与子组件建立父子关系（抽象组件）
2. 通过`include exclude`设置包含/不含组件名单 （正则，字符串，数组）
3. 设置 `max` 最大缓存实例个数 `LRU`算法
4. 将缓存的组件实例 `cache`对象进行缓存 不会再经过初始化阶段，而出直接进行 `patch`更新
------