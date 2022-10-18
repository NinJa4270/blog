Promise._race = function (promiseArray) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArray.length; i++) {
            const p = Promise.resolve(promiseArray[i])
            p.then(resolve, reject)
        }
    })
}