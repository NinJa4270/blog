import { test, expect } from 'vitest'
import _Promise from './index'


test("then 返回一个new Promise resolve 再reject", async () => {
    let promiseResult = '', myPromiseResult = null
    const fn = async function () {
        const promise = new Promise((resolve, reject) => {
            resolve('resolve')
        })

        await promise.then((res) => {
            return new Promise((resolve, reject) => {
                resolve('resolve')
                reject('reject')
            })
        }).then(res => {
            promiseResult = res
        }, error => {
            promiseResult = res
        })


        const myPromise = new _Promise((resolve, reject) => {
            resolve('resolve')
        })

        await myPromise.then((res) => {
            return new _Promise((resolve, reject) => {
                resolve('resolve')
                reject('reject')
            })
        }).then(res => {
            myPromiseResult = res
        }, error => {
            myPromiseResult = res
        })
    }
    await fn()
    expect(myPromiseResult).toEqual(promiseResult);
});


test("then 返回一个new Promise resolve 嵌套 Promise", async () => {
    let promiseResult = '', myPromiseResult = null
    const fn = async function () {
        const promise = new Promise((resolve, reject) => {
            resolve('resolve')
        })

        await promise.then((res) => {
            return new Promise((resolve, reject) => {
                resolve(new Promise((resolve, reject) => {
                    resolve('嵌套resolve')
                }))
            })
        }).then(res => {
            promiseResult = res
        })


        const myPromise = new _Promise((resolve, reject) => {
            resolve('resolve')
        })

        await myPromise.then((res) => {
            return new _Promise((resolve, reject) => {
                resolve(new _Promise((resolve, reject) => {
                    resolve('嵌套resolve')
                }))
            })
        }).then(res => {
            myPromiseResult = res
        })
    }
    await fn()
    expect(myPromiseResult).toEqual(promiseResult);
});
