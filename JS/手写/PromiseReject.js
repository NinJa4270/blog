Promise._reject = function (target) {
    return new Promise((resovle, reject) => {
        reject(target)
    })
}