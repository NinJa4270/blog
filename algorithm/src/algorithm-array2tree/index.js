export function array2Tree(list, pid = null) {
    const result = []
    for (let i = 0, len = list.length; i < len; i++) {
        const node = list[i]
        if (node.pid === pid) {
            const children = array2Tree(list, node.id)
            if (children.length) {
                node.children = children
            }
            delete node.pid
            result.push(node)
        }
    }
    return result
}
