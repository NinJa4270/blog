import { test, expect } from 'vitest'
import './index'
test("forEach", async () => {

    const arr = [1, 2, 3]
    const obj = {
        flag: 'abc'
    }
    const result = {}

    arr.forEach(function (value, index, array) {
        result[index] = this.flag + ' ' + 'index: ' + index + ' value: ' + value
    }, obj)

    const result2 = {}
    arr._forEach(function (value, index, array) {
        result2[index] = this.flag + ' ' + 'index: ' + index + ' value: ' + value
    }, obj)

    expect(result2).toEqual(result);

});

