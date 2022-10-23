export function selectSort(list) {
    const len = list.length
    let minIndex
    for (let i = 0; i < len; i++) {
        minIndex = i
        for (let j = i; j < len; j++) {
            if (list[j] < list[minIndex]) {
                minIndex = j
            }
        }

        if (minIndex !== i) {
            [list[i], list[minIndex]] = [list[minIndex], list[i]]
        }
    }
    return list
}
