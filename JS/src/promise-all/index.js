Promise._all = function (array) {
    const result = [], len = array.length
    let count = 0
    return new Promise((resolve, reject) => {
        array.forEach((item, index) => {
            let p = Promise.resolve(item)
            p.then(res => {
                result[index] = res
                count++
                if (count === len) {
                    resolve(result)
                }
            }).catch(e => {
                reject(e)
            })
        })
    })
}