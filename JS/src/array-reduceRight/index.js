Array.prototype._reduceRight = function (cb, init) {
    let i = init == undefined ? this.length - 2 : this.length - 1
    let pre = init == undefined ? this[this.length - 1] : init
    for (; i > -1; i--) {
        pre = cb(pre, this[i], i, this)
    }
    return pre
}
