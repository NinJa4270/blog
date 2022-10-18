import { test, expect } from 'vitest'
import './index'
test("every", () => {
    const array = [2, 4, 6, 8];
    const obj = {
        flag: 2
    }
    const result = array.every(function (element) {
        return element % this.flag === 0
    }, obj)


    const result2 = array._every(function (element) {
        return element % this.flag === 0
    }, obj)

    expect(result2).toEqual(result);
});

