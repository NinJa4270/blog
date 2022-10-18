import { test, expect } from 'vitest'
import './index'
test("lastIndexOf", () => {
    const array = [2, 4, 6, 8];
    const result = array.lastIndexOf(8, -1)
    const result2 = array._lastIndexOf(8, -1)
    expect(result2).toEqual(result);
});

