### Vue diff算法及优化策略
1. Vue采用的是双端对比法 深度优先、同层比较的方式进行比对
   1. 定义4个游标( `oldStartIdx newStartIdx oldEndIdx newEndIdx` )及节点 ( `oldStartVnode oldEndVnode newStartVnode newEndVnode` )
   2. 遍历 当游标交叉时结束 
   3. 寻找可复用节点 (`key,tag` 来做对比)
      1. **旧头部** `oldStartVnode` 与 **新头部** `newStartVnode` 对比相同 
         1. 递归对比子节点 `patchVnode`
         2. 游标右移 `oldStartIdx newStartIdx`
         3. 重新设置节点 `oldStartVnode newStartVnode`
      2. **旧尾部** `oldEndVnode` 与 **新尾部** `newEndVnode` 对比相同
         1. 递归对比子节点 `patchVnode`
         2. 游标左移 `oldEndIdx newEndIdx`
         3. 重新设置节点 `oldEndVnode newEndVnode`
      3. **旧头部** `oldStartVnode` 与 **新尾部** `newEndVnode` 对比相同
         1. 递归对比子节点 `patchVnode`
         2. 进行节点移动(真实DOM) 将旧开始节点移动到旧结束节点之后
         3. `oldStartIdx` 右移, `newEndIdx`左移
         4. 重新设置节点 `oldStartVnode newEndVnode`
      4. **旧尾部** `oldEndVnode` 与 **新头部** `newStartVnode` 对比相同
         1. 递归对比子节点 `patchVnode`
         2. 进行节点移动(真实DOM)  将旧结束节点 移动到 旧开始节点之前
         3. `oldEndIdx` 左移, `newStartIdx` 右移
         4. 重新设置节点 `oldEndVnode newStartVnode`
   4. 以上四种都不满足
      1.  从 老节点中 寻找与 新开始节点 `key` 相同的节点 
      2.  如果找到
          1.  递归对比子节点 `patchVnode`
          2.  进行节点移动(真实DOM)，将从旧节点找到的这个节点 移动到 旧开始节点之前
      3.  如果没有找到
          1.  创建新开始节点 插入到 旧开始节点之前
      4.  `newStartIdx` 右移
      5.   重新设置节点 `newStartVnode`
   5. 在遍历结束后
      1. 遍历完成后，旧节点还存在未被遍历的节点，说明这些节点是要被剔除的节点，最后删除节点。
      2. 遍历完成后，新节点还存在未被便利的节点，说明需要新增这些节点（新开始与新结束之间的节点），将其插入到新结束节点的后一个节点之前。
------