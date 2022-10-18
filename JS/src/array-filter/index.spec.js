import { test, expect } from 'vitest'
import './index'
test("filter", async () => {

    const arr = [1, 2, 3]
    const obj = {
        flag: 2
    }
    const result = arr.filter(function (value, index, array) {
        if (value <= this.flag) return true
    }, obj)

    const result2 = arr._filter(function (value, index, array) {
        if (value <= this.flag) return true
    }, obj)

    expect(result2).toEqual(result);
});

