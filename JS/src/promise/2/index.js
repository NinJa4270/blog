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
        if (this.state === _Promise.FULFILLED) {
            onFulfilled(this.result)
        }
        if (this.state === _Promise.REJECTED) {
            onRejected(this.result)
        }
        // 异步时 进行订阅 收集回调函数
        if (this.state === _Promise.PENDING) {
            this.onFulfilledCbs.push(() => { onFulfilled(this.result) })
            this.onRejectedCbs.push(() => { onRejected(this.result) })
        }
    }
}