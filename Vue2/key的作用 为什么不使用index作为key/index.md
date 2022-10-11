### key的作用 为什么不使用index作为key

1. 在 `diff` 算法中, 为了复用节点，会通过判断 `key tag`两个 `vnode` 中的两个值来判断是否为同一个节点，从而进行复用。如果没有设置 `key`, key的值都会是 `undefined`， 都会被认为是同一个可复用节点，而造成匹配不准确而消耗性能
2. 使用 `index` 作为 `key` 和不设置 `key` 本质上是相同的。 ( `1 === 1; undefined === undefined;`) 