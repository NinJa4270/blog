import { test, expect } from 'vitest'
import './index'
test("promise all success", async () => {
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

    await Promise.all([p1, p2, p3]).then(res => {
        promiseResult = res
    }).catch(e => {
        console.log(e);
    })

    await Promise._all([p1, p2, p3]).then(res => {
        myPromiseResult = res
    }).catch(e => {
        console.log(e);
    })

    expect(myPromiseResult).toEqual(promiseResult);
});



test("promise all fail", async () => {
    let promiseResult = '', myPromiseResult = null
    const p4 = Promise.reject('p4 rejected')

    const p5 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('p5 rejected 延时1.5秒')
        }, 1500)
    })

    await Promise.all([p4, p5]).then(res => {
        promiseResult = res
    }).catch(e => {
        promiseResult = e
    })

    await Promise._all([p4, p5]).then(res => {
        myPromiseResult = res
    }).catch(e => {
        myPromiseResult = e
    })

    expect(myPromiseResult).toEqual(promiseResult);
});

