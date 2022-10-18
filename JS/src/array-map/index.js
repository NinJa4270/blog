// Array.prototype._map = function (cb, thisArg = this) {
//     const result = []
//     for (let i = 0; i < this.length; i++) {
//         const ret = cb.call(thisArg, this[i], i, this)
//         result.push(ret)
//     }
//     return result
// }


// reduce实现map
Array.prototype._map = function (cb, thisArg = this) {
    const result = []
    this.reduce((pre, curr, index, array) => {
        result.push(cb.call(thisArg, curr, index, array))
    }, null)
    return result
}
