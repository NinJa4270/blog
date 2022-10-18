
Function.prototype._apply = function (ctx = window, args) {
    const fn = this
    const key = Symbol(1)
    ctx[key] = fn
    const res = ctx[key](...args)
    delete ctx[key]
    return res
}