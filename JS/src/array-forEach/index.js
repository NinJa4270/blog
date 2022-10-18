Array.prototype._forEach = function (cb, thisArg = this) {
    for (let i = 0; i < this.length; i++) {
        cb.call(thisArg, this[i], i, this)
    }
}