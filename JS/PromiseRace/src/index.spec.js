import { test, expect } from 'vitest'
import './index'
test("promise race success", async () => {
    let promiseResult = '', myPromiseResult = null
    const p1 = Promise.resolve('p1')
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p2 延时一秒')
        }, 1000)
    })
    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p3 延时两秒')
        }, 2000)
    })

    const p4 = 1
    await Promise.race([p1, p2, p3, p4]).then(res => {
        promiseResult = res
    })

    await Promise._race([p1, p2, p3, p4]).then(res => {
        myPromiseResult = res
    })

    expect(myPromiseResult).toEqual(promiseResult);
});

test("promise race fail", async () => {
    let promiseResult = '', myPromiseResult = null
    // const p1 = Promise.reject('p1')
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('p1 延时一秒')
        }, 1000)
    })
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p2 延时两秒')
        }, 2000)
    })

    await Promise.race([p1, p2]).then(res => {
        promiseResult = res
    }).catch(e => {
        promiseResult = e
    })

    await Promise._race([p1, p2]).then(res => {
        myPromiseResult = res
    }).catch(e => {
        myPromiseResult = e
    })

    console.log('%cindex.spec.js line:24 promiseResult', 'color: #007acc;', promiseResult);
    console.log('%cindex.spec.js line:25 myPromiseResult', 'color: #007acc;', myPromiseResult);
    expect(myPromiseResult).toEqual(promiseResult);
});




