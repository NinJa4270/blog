import { test, expect } from 'vitest'
import './index'

test("apply", () => {
    const obj = {
        a: 10,
        b: 20
    }
    const fn = function (c, d) {
        return this.a + this.b + c + d
    }
    const apply = fn.apply(obj, [100, 200])
    const myApply = fn._apply(obj, [100, 200])
    expect(myApply).toEqual(apply);
});

