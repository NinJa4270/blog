export default class _Promise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw TypeError(`${fn} is not a function`)
        }
        this.state = _Promise.PENDING
        this.result = undefined
        this.onFulfilledCbs = []
        this.onRejectedCbs = []
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }

    resolve(value) {
        if (this.state === _Promise.PENDING) {
            this.state = _Promise.FULFILLED
            this.result = value

            // 发布 执行异步时收集的回调
            this.onFulfilledCbs.forEach(fn => fn());
        }
    }
    reject(reason) {
        if (this.state === _Promise.PENDING) {
            this.state = _Promise.REJECTED
            this.result = reason

            // 发布 执行异步时收集的回调
            this.onRejectedCbs.forEach(fn => fn());
        }
    }

    then(onFulfilled, onRejected) {
        // 为 onFulfilled onRejected 设置默认值
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        let promise2 = new _Promise((resolve, reject) => {
            // 为了 resolvePromise 可以拿到 promise2 实例 需要用 微任务/宏任务 异步包装
            if (this.state === _Promise.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (reason) {
                        reject(reason)
                    }
                }, 0);
            }
            if (this.state === _Promise.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (reason) {
                        reject(reason)
                    }
                }, 0);
            }
            // 异步时 进行订阅 收集回调函数
            if (this.state === _Promise.PENDING) {
                this.onFulfilledCbs.push(() => {
                    try {
                        let x = onFulfilled(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (reason) {
                        reject(reason)
                    }
                })
                this.onRejectedCbs.push(() => {
                    try {
                        let x = onRejected(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (reason) {
                        reject(reason)
                    }
                })
            }
        })
        return promise2
    }

    catch(errorCb) {
        return this.then(null, errorCb)
    }
}

/**
 * @description 判断 then 返回的值x 是普通值 还是 promise
 * @param {*} promise2
 * @param {*} x
 * @param {*} resolve
 * @param {*} reject
 */
function resolvePromise(promise2, x, resolve, reject) {
    // promise2 x 不能指向同一个地址 造成死循环
    // TypeError: Chaining cycle detected for promise #<Promise>
    // If promise and x refer to the same object, reject promise with a TypeError as the reason.
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    let called = false
    // 取出then 并判断 从而确定 x 是不是 promise
    if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
        // 如果then别劫持 可能会 throw error 因此用try catch包裹
        try {
            let then = x.then
            // 确定 x 就是 promise
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else { // 不是 promise 就直接 resolve
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}