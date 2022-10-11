### 模版生成render的过程 compile
![](%E6%A8%A1%E7%89%88%E7%94%9F%E6%88%90render.drawio.png)

1. 将组件的 `template` 通过 `parse` 解析为 `ast对象`(抽象语法树)。
2. 通过 `optimize` 对 ast对象 做静态标记处理。
3. 通过 `generate` 
   1. 将ast对象 静态标记的节点放到 `staticRenderFns` 中 返回
   2. 将其他节点处理成可执行的字符串通过 `with(this){return ${code}}` 包裹 返回
4. 最后通过 `compileToFunctions` 调用 `createFunction` ( `new Function(code)`)
   1. 将 `render` 进一步处理返回
   2. 将 `staticRenderFns` `map`遍历后 对每一项进行 `createFunction`包裹返回
5. 最后得到了 `render` 函数,和 `staticRenderFns` 数组，去生成 `虚拟Dom`
------