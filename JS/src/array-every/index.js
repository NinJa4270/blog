Array.prototype._every = function (cb, thisArg = this) {
    for (let i = 0; i < this.length; i++) {
        const ret = cb.call(thisArg, this[i], i, this)
        if (!!ret) {
            continue
        } else {
            return false
        }
    }
    return true
}