import { test, expect } from 'vitest'
import _Promise from './index'


test("链式调用 then 不传", async () => {
    let promiseResult = '', myPromiseResult = null
    const fn = async function () {
        const promise = new Promise((resolve, reject) => {
            resolve('resolve')
        })

        await promise.then().then().then().then(res => {
            promiseResult = res
        })


        const myPromise = new _Promise((resolve, reject) => {
            resolve('resolve')
        })

        await myPromise.then().then().then().then(res => {
            myPromiseResult = res
        })
    }
    await fn()
    expect(myPromiseResult).toEqual(promiseResult);
});
