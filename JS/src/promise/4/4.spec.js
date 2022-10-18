import { test, expect } from 'vitest'
import _Promise from './index'



test("then 返回一个Error", async () => {
    let promiseResult = '', myPromiseResult = null
    const fn = async function () {
        const promise = new Promise((resolve, reject) => {
            resolve('resolve')
        })

        await promise.then((res) => {
            throw new Error('error')
        }).then(res => {
            // promiseResult = res
        }, error => {
            promiseResult = error
        })


        const myPromise = new _Promise((resolve, reject) => {
            resolve('resolve')
        })

        await myPromise.then((res) => {
            throw new Error('error')
        }).then(res => {
            // myPromiseResult = res
        }, error => {
            myPromiseResult = error
        })
    }

    await fn()

    expect(myPromiseResult).toEqual(promiseResult);
});

test("then 返回一个new Promise resolve", async () => {
    let promiseResult = '', myPromiseResult = null
    const fn = async function () {
        const promise = new Promise((resolve, reject) => {
            resolve('resolve')
        })

        await promise.then((res) => {
            return new Promise((resolve, reject) => {
                resolve(res + ' promise-resolve')
            })
        }).then(res => {
            promiseResult = res
        })


        const myPromise = new _Promise((resolve, reject) => {
            resolve('resolve')
        })

        await myPromise.then((res) => {
            return new _Promise((resolve, reject) => {
                resolve(res + ' promise-resolve')
            })
        }).then(res => {
            myPromiseResult = res
        })
    }

    await fn()
    expect(myPromiseResult).toEqual(promiseResult);
});

test("then 返回一个new Promise reject", async () => {
    let promiseResult = '', myPromiseResult = null
    const fn = async function () {
        const promise = new Promise((resolve, reject) => {
            resolve('resolve')
        })

        await promise.then((res) => {
            return new Promise((resolve, reject) => {
                reject(res + ' promise-reject')
            })
        }).then(res => {
            // promiseResult = res 
        }, error => {
            promiseResult = error // 走这里
        })


        const myPromise = new _Promise((resolve, reject) => {
            resolve('resolve')
        })

        await myPromise.then((res) => {
            return new _Promise((resolve, reject) => {
                reject(res + ' promise-reject')
            })
        }).then(res => {
            myPromiseResult = res
        }, (error) => {
            myPromiseResult = error // 走这里
        })
    }

    await fn()

    expect(myPromiseResult).toEqual(promiseResult);
});