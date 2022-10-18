Array.prototype._forEach = function (cb, thisArg) {
    for (let i = 0, l = this.length; i < l; i++) {
        cb.call(this, this[i], i, this)
    }
}