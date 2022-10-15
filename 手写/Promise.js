export default class _Promise {
    static PENDING = "pending"
    static REJECTED = "rejected"
    static FULFILLED = 'fulfilled'
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
            this.onFulfilledCbs.map(fn => fn())
        }
    }
    reject(reason) {
        if (this.state === _Promise.PENDING) {
            this.state = _Promise.REJECTED
            this.result = reason
            this.onRejectedCbs.map(fn => fn())
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        let promise2 = new _Promise((resolve, reject) => {
            if (this.state === _Promise.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.state === _Promise.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.state === _Promise.PENDING) {
                this.onFulfilledCbs.push(() => {
                    try {
                        let x = onFulfilled(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCbs.push(() => {
                    try {
                        let x = onRejected(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
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

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        throw new TypeError('死循环')
    }
    let called = false
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}