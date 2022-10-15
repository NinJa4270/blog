import { test, expect } from 'vitest'
import _Promise from './index'



test("array result", async () => {
    let promiseResult = '', myPromiseResult = null
    const promise = new Promise((resolve, reject) => {
        resolve('resolve result')
    })
    await promise.then((res) => {
        promiseResult = res
    })
    await promise.then((res) => {
        promiseResult += res
    })

    const myPromise = new _Promise((resolve, reject) => {
        resolve('resolve result')
    })

    myPromise.then((res) => {
        myPromiseResult = res
    })
    myPromise.then((res) => {
        myPromiseResult += res
    })
    expect(myPromiseResult).toEqual(promiseResult);
});

test("settimeout result", async () => {
    let promiseResult = '', myPromiseResult = null
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolve result')
        }, 0);
    })
    await promise.then((res) => {
        promiseResult = res
    })

    const myPromise = new _Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolve result')
        }, 0);
    })

    myPromise.then((res) => {
        myPromiseResult = 'resolve result'
        expect(myPromiseResult).toEqual(promiseResult);

    })
});

test("array settimeout result", async () => {
    let promiseResult = '', myPromiseResult = null
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolve result')
        }, 0);
    })
    await promise.then((res) => {
        promiseResult = res
    })
    await promise.then((res) => {
        promiseResult += res
    })

    const myPromise = new _Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolve result')
        }, 0);
    })

    myPromise.then((res) => {
        myPromiseResult = 'resolve result'
        myPromise.then((res) => {
            myPromiseResult += 'resolve result'
            expect(myPromiseResult).toEqual(promiseResult);
        })
    })
});

