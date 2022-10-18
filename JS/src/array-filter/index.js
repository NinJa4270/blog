Array.prototype._filter = function (cb, thisArg = this) {
    const result = []
    for (let i = 0; i < this.length; i++) {
        const ret = cb.call(thisArg, this[i], i, this)
        if (ret) {
            result.push(this[i])
        }
    }
    return result
}

// reduce实现filter
Array.prototype._filter = function (cb, thisArg = this) {
    const result = []
    this.reduce((pre, curr, index, array) => {
        const ret = cb.call(thisArg, curr, index, array)
        if (ret) {
            result.push(curr)
        }
    }, null)
    return result
}
