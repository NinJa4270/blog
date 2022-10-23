export function quickSort(list) {
    if (list.length <= 1) return list
    const minList = [],
        maxList = []
    let len = list.length,
        midIndex = Math.round(len / 2)

    const midValue = list.splice(midIndex, 1)[0]
    len = list.length
    for (let i = 0; i < len; i++) {
        const value = list[i]
        if (value >= midValue) {
            maxList.push(value)
        } else if (value < midValue) {
            minList.push(value)
        }
    }
    return [...quickSort(minList), midValue, ...quickSort(maxList)]
}