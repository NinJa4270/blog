Promise._resolve = function (target) {
    if (target instanceof Promise) {
        return target
    } else {
        return new Promise((resovle) => {
            resovle(target)
        })
    }
}