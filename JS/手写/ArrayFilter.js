Array.prototype._filter = function (cb, thisArg) {
    const res = []
    for (let i = 0, l = this.length; i < l; i++) {
        if (cb.call(this, this[i], i, this)) {
            res.push(this[i])
        }
    }
    return res
}

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
