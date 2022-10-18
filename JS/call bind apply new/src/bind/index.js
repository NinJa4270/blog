Function.prototype._bind = function (ctx = window, ...args1) {
    const fn = this
    return function (...args2) {
        return fn.apply(ctx, [...args1, ...args2])
    }
}


Function.prototype._bind2 = function (ctx = window, ...args1) {
    const fn = this
    const bindFn = function (...args2) {
        return fn.apply(this instanceof bindFn ? this : ctx, [...args1, ...args2])
    }

    // const temp = function () { }
    // temp.prototype = fn.prototype
    // bindFn.prototype = new temp()
    bindFn.prototype = Object.create(fn.prototype)
    return bindFn
}