import { test, expect } from 'vitest'
import { _new, _new2 } from './index'

test("new", () => {
    function Fn(a, b) {
        this.a = a
        this.b = b
    }
    Fn.prototype.add = function (c) {
        return this.a + this.b + c
    }

    const fn1 = new Fn(10, 20)
    const result1 = fn1.add(100)

    const fn2 = _new(Fn, 10, 20)
    const result2 = fn2.add(100)

    expect(result2).toEqual(result1);
});



test("构造函数返回原始值", () => {
    function Fn(a, b) {
        this.a = a
        this.b = b
        return null
    }
    const fn1 = new Fn(10, 20)
    const fn2 = _new2(Fn, 10, 20)
    expect(fn2).toEqual(fn1);
});

