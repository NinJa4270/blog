import { test, expect } from 'vitest'
import _Promise from './index'

test("then 返回一个普通值", async () => {
    let promiseResult = '', myPromiseResult = null
    const fn = async function () {
        const promise = new Promise((resolve, reject) => {
            resolve('first result')
        })
        await promise.then((res) => {
            return res
        }).then(res => {
            return res + ' second result'
        }).then(res => {
            promiseResult = res
        })

        const myPromise = new _Promise((resolve, reject) => {
            resolve('first result')
        })

        myPromise.then((res) => {
            return res
        }).then(res => {
            return res + ' second result'
        }).then(res => {
            myPromiseResult = res
        })
    }

    await fn()

    expect(myPromiseResult).toEqual(promiseResult);
});
