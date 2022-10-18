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