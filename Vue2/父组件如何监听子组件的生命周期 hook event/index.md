### 父组件如何监听子组件的生命周期 hook event

1. 通过子组件$emit 需要修改子组件

   ```js
    const Children = {
       name: 'children',
       template: `<div>children</div>`,
       mounted() {
           this.$emit('mount','mount')
       }
   }
    const template = `
       <div class="parent-class">
           Parent
           <Children @mount="mount" />
       </div>
   `
   const vm = new Vue({
       template: template,
       components: { Children, },
       methods: {
         mount(val){
           console.log('mount',val)
         }
       }
   }).$mount('#app')
   ```

2. 通过 `event hook` 不需要修改子组件 但是无法传参数
   ```js
   const Children = {
       name: 'children',
       template: `<div>children</div>`,
   }
   const template = `
   <div class="parent-class">
   	Parent
   	<Children @hook:mounted="mount" />
   </div>
   `
   const vm = new Vue({
       template: template,
       components: { Children, },
       methods: {
           mount() {
               console.log('mount')
           }
       }
   }).$mount('#app')
   ```

   `event hook` 本质上就是调用了 `this.$emit('hook'+ hook)`