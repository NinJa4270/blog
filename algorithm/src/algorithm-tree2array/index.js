export function tree2Array(tree, pid = null) {
    const result = []
    for (let i = 0, len = tree.length; i < len; i++) {
        let element = tree[i]
        const children = element.children
        delete element.children
        result.push({
            ...element,
            pid
        })
        if (children?.length) {
            result.push(...tree2Array(children, element.id))
        }
    }
    return result
}

