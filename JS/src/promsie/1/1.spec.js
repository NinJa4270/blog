import { test, expect } from 'vitest'
import _Promise from './index'


test("resolve result", async () => {
    let promiseResult = '', myPromiseResult = null
    const promise = new Promise((resolve, reject) => {
        resolve('resolve result')
    })
    await promise.then((res) => {
        promiseResult = res
    })

    const myPromise = new _Promise((resolve, reject) => {
        resolve('resolve result')
    })

    myPromise.then((res) => {
        myPromiseResult = res
    })

    expect(myPromiseResult).toEqual(promiseResult);
});

test("rejct result", async () => {
    let promiseResult = '', myPromiseResult = null
    const promise = new Promise((resolve, reject) => {
        reject('rejct result')
    })
    await promise.then((res) => {
        promiseResult = res
    }, (e) => {
        promiseResult = e
    })

    const myPromise = new _Promise((resolve, reject) => {
        reject('rejct result')
    })

    myPromise.then((res) => {
        myPromiseResult = res
    }, (e) => {
        myPromiseResult = e
    })

    expect(myPromiseResult).toEqual(promiseResult);
});


test("error result", async () => {
    let promiseResult = '', myPromiseResult = null
    const promise = new Promise((resolve, reject) => {
        throw new Error('error result')
    })
    await promise.then((res) => {
        promiseResult = res
    }, (e) => {
        promiseResult = e
    })

    const myPromise = new _Promise((resolve, reject) => {
        throw new Error('error result')
    })

    myPromise.then((res) => {
        myPromiseResult = res
    }, (e) => {
        myPromiseResult = e
    })

    expect(myPromiseResult).toEqual(promiseResult);
});