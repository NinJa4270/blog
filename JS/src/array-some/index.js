Array.prototype._some = function (cb, thisArg = this) {
    for (let i = 0; i < this.length; i++) {
        const ret = cb.call(thisArg, this[i], i, this)
        if (!!ret) {
            return true
        } else {
            continue
        }
    }
    return false
}