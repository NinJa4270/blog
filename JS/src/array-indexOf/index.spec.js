import { test, expect } from 'vitest'
import './index'
test("indexOf", () => {
    const array = [2, 4, 6, 8];
    const result = array.indexOf(8, '2')
    const result2 = array._indexOf(8, '2')
    expect(result2).toEqual(result);
});

