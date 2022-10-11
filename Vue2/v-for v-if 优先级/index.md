### v-for/v-if 的优先级
1. 在 `generate`时（将 `ast` 转换为 可执行的 `render code`） 会调用`genElement`将 `ast` 转换为 `render code`。
2. 而 `genElement`，会先处理的 `v-for` 指令，然后再处理 `v-if`
3. 因此 `v-for/v-if` 同一标签使用会造成性能损耗。（可使用 `template` 包裹）