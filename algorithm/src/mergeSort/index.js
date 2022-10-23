export function mergeSort(list) {
    const len = list.length

    if (len <= 1) return list

    const midIndex = Math.round(len / 2)

    const leftList = mergeSort(list.slice(0, midIndex))
    const rightList = mergeSort(list.slice(midIndex, len))

    list = merge(leftList, rightList)

    return list
}

function merge(list1, list2) {

    let i = 0, j = 0
    const res = []
    const len1 = list1.length
    const len2 = list2.length

    while (i < len1 && j < len2) {
        if (list1[i] < list2[j]) {
            res.push(list1[i])
            i++
        } else {
            res.push(list2[j])
            j++
        }
    }

    if (i < len1) {
        return [...res, ...list1.slice(i)]
    } else {
        return [...res, ...list2.slice(j)]
    }
}