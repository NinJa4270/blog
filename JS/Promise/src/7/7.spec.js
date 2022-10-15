import { test, expect } from 'vitest'
import _Promise from './index'


test("catch", async () => {
    let promiseResult = '', myPromiseResult = null
    const fn = async function () {
        const promise = new Promise((resolve, reject) => {
            reject('error')
        })

        await promise.then(res => {
            promiseResult = res
        }).catch(e => {
            promiseResult = e
        })

        const myPromise = new _Promise((resolve, reject) => {
            reject('error')
        })

       await myPromise.then(res => {
            myPromiseResult = res
        }).catch(e => {
            myPromiseResult = e
        })
    }
    await fn()
    expect(myPromiseResult).toEqual(promiseResult);
});
