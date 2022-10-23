import { test, expect } from 'vitest'
import { quickSort } from './index'
test("quickSort", () => {
    const array = [4, 1, 3, 5, 7, 1, 6, 9, 1, 3, 2]
    const expectResult = [1, 1, 1, 2, 3, 3, 4, 5, 6, 7, 9]
    expect(quickSort(array)).toEqual(expectResult);
});

