Function.prototype._call = function (ctx = window, ...args) {
    const fn = this
    const key = Symbol(1)
    ctx[key] = fn
    const res = ctx[key](...args)
    delete ctx[fn]
    return res
}