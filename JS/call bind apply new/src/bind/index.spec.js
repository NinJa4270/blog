import { test, expect } from 'vitest'
import './index'

test("bind", () => {
    const obj = {
        a: 10,
        b: 20
    }
    const fn = function (c, d) {
        return this.a + this.b + c + d
    }
    const fn1 = fn.bind(obj, 100)
    const bind = fn1(200)

    const fn2 = fn._bind(obj, 100)
    const myBind = fn2(200)

    expect(myBind).toEqual(bind);
});


test("bind new", () => {
    const obj = {
        a: 10,
        b: 20
    }
    const fn = function (c) {
        return this.a + this.b
    }

    fn.prototype.test = function () {
        return 'test'
    }

    const fn1 = fn.bind(obj, 100)
    const newFn1 = new fn1()

    const fn2 = fn._bind2(obj, 100)
    const newFn2 = new fn2()

    expect(newFn2.test()).toEqual(newFn1.test());
});


