import { test, expect } from 'vitest'
import './index'
test("map", async () => {

    const arr = [1, 2, 3]
    const obj = {
        flag: 'abc'
    }


    const result = arr.map(function (value, index, array) {
        return {
            flag: this.flag,
            index: index,
            value: value
        }
    }, obj)


    const result2 = arr._map(function (value, index, array) {
        return {
            flag: this.flag,
            index: index,
            value: value
        }
    }, obj)

    expect(result2).toEqual(result);
});

