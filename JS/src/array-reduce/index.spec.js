import { test, expect } from 'vitest'
import './index'
test("reduce", () => {
    const array = [2, 4, 6, 8];
    const result = array.reduce((pre, curr) => pre + curr)
    const result2 = array._reduce((pre, curr) => pre + curr)
    expect(result2).toEqual(result);
});

