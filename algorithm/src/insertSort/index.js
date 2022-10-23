export function insertSort(list) {
    const len = list.length
    let temp
    for (let i = 1; i < len; i++) {
        temp = list[i]
        let j = i
        for (; j > 0 && list[j - 1] > temp; j--) {
            list[j] = list[j - 1]
        }
        list[j] = temp
    }
    return list
}