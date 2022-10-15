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
        }
    }
    reject(reason) {
        if (this.state === _Promise.PENDING) {
            this.state = _Promise.REJECTED
            this.result = reason
        }
    }

    then(onFulfilled, onRejected) {
        if (this.state === _Promise.FULFILLED) {
            onFulfilled(this.result)
        }
        if (this.state === _Promise.REJECTED) {
            onRejected(this.result)
        }
    }
}