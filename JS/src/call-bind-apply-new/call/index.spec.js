import { test, expect } from 'vitest'
import './index'

test("call", () => {
    const obj = {
        a: 10,
        b: 20
    }
    const fn = function (c, d) {
        return this.a + this.b + c + d
    }
    const call = fn.call(obj, 100, 200)
    const myCall = fn._call(obj, 100, 200)
    expect(myCall).toEqual(call);
});

