import { test, expect } from 'vitest'
import './index'
test("some", () => {
    const array = [1, 2, 3, 4, 5];
    const obj = {
        flag: 2
    }
    const result = array.some(function (element) {
        return element % this.flag === 0
    }, obj)


    const result2 = array._some(function (element) {
        return element % this.flag === 0
    }, obj)

    expect(result2).toEqual(result);
});

