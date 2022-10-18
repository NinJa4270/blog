import { test, expect } from 'vitest'
import './index'
test("promise reject", async () => {
    let promiseResult = '', myPromiseResult = ''

    await Promise.reject(new Error('fail')).catch(e => {
        promiseResult = e
    })

    await Promise._reject(new Error('fail')).catch(e => {
        myPromiseResult = e
    })

    expect(myPromiseResult).toEqual(promiseResult);
});





