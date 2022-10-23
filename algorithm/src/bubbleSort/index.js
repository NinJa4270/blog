export function bubbleSort(list) {
    const len = list.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                ;[list[j], list[j + 1]] = [list[j + 1], list[j]]
            }
        }
    }
    return list
}
