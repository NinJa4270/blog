import { test, expect } from 'vitest'
import './index'
test("promise resolve", async () => {
    let promiseResult = '', myPromiseResult = ''
    const p1 = Promise.resolve('p1 成功')
    const p2 = Promise.resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p2 成功-延时0.1')
        }, 100)
    }))

    const p3 = {
        then(resolve) {
            setTimeout(() => {
                resolve('p3 成功-延时0.2')
            }, 200)
        }
    }


    await p1.then(res => {
        promiseResult += res
    })
    await p2.then(res => {
        promiseResult += res
    })
    await p3.then(res => {
        promiseResult += e
    })


    const _p1 = Promise._resolve('p1 成功')
    const _p2 = Promise._resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p2 成功-延时0.1')
        }, 100)
    }))
    const _p3 = {
        then(resolve) {
            setTimeout(() => {
                resolve('p3 成功-延时0.2')
            }, 200)
        }
    }

    await _p1.then(res => {
        myPromiseResult += res
    })
    await _p2.then(res => {
        myPromiseResult += res
    })
    await _p3.then(res => {
        myPromiseResult += res
    })


    expect(myPromiseResult).toEqual(promiseResult);
});





