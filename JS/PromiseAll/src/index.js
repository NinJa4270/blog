Promise._all = function (promiseArray) {
    const result = []
    let count = 0
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArray.length; i++) {
            const p = promiseArray[i]
            p.then(res => {
                result.push(res)
                count++
                if (count === promiseArray.length) {
                    resolve(result)
                }
            }).catch(e => {
                reject(e)
            })
        }
    })
}