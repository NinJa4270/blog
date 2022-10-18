Array.prototype._map = function (cb, thisArg = this) {
    const result = []
    for (let i = 0; i < this.length; i++) {
        const ret = cb.call(thisArg, this[i], i, this)
        result.push(ret)
    }
    return result
}