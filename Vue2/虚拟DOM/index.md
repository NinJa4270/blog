### 虚拟Dom的理解
1. 描述DOM结构的js对象
2. ```
    template => 通过 parse 解析 => ast => 通过 generate => code => render Fn => 通过 _update => vnode => 真实DOM
   ```
3. 优势 
   1. 虚拟DOM的出现是为了提升开发效率，使用户并不需要关系dom操作，而不是提高性能。
   2. 修改dom属性，可以是直接对js对象属性进行修改，通过 `diff` 从而减少 `dom` 操作次数, 从而减少重绘重排带来的性能消耗。
   3. 虚拟DOM并不依赖浏览器，跨端开发可以复用虚拟DOM，在`浏览器，ios、android、ssr、webgl中`，使用不同的平台api进行渲染。
4. 劣势 
   1. `虚拟dom`需要根据 `真实dom` 构建js对象 在做更新时，需要经过大量遍历计算，因此速度并不一定会比真实dom快。
------