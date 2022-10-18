Promise._allSettled = function (promiseArray) {
    const result = []
    let count = 0

    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArray.length; i++) {
            const p = Promise.resolve(promiseArray[i])

            p.then(res => {
                result[i] = {
                    status: 'fulfilled',
                    value: res
                }
                count++
                if (count === promiseArray.length) {
                    resolve(result)
                }

            }).catch(e => {
                result[i] = {
                    status: 'rejected',
                    reason: e
                }
                count++
                if (count === promiseArray.length) {
                    resolve(result)
                }
            })
        }
    })
}