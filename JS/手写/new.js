function _new(target, ...args) {
    const obj = Object.create(target.prototype)
    const res = target.apply(obj, args)
    return res instanceof Object ? res : obj
}