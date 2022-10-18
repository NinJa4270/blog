import { test, expect } from 'vitest'
import './index'
test("promise allSettled ", async () => {
    let promiseResult = '', myPromiseResult = null
    const p1 = Promise.resolve('p1 成功')
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p2 成功-延时一秒')
        }, 1000)
    })

    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('p3 失败-延时三秒')
        }, 3000)
    })

    const p4 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p4 成功-延时两秒')
        }, 2000)
    })


    console.time('start')
    await Promise.allSettled([p1, p2, p3, p4]).then(res => {
        promiseResult = res
    })
    console.timeEnd('start')


    await Promise._allSettled([p1, p2, p3, p4]).then(res => {
        myPromiseResult = res
    })

    expect(myPromiseResult).toEqual(promiseResult);
});
