Array.prototype._map = function (cb, thisArg) {
    const res = []
    for (let i = 0, l = this.length; i < l; i++) {
        res.push(cb.call(this, this[i], i, this))
    }
    return res
}