Array.prototype._reduce = function (cb, init) {
    let pre = init == undefined ? this[0] : init
    let i = init == undefined ? 1 : 0;
    for (; i < this.length; i++) {
        pre = cb(pre, this[i], i, this)
    }
    return pre
}