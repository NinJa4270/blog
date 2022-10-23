import { test, expect } from 'vitest'
import { mergeSort } from './index'
test("mergeSort", () => {
    const array = [4, 1, 3, 5, 7, 1, 6, 9, 1, 3, 2]
    const expectResult = [1, 1, 1, 2, 3, 3, 4, 5, 6, 7, 9]
    expect(mergeSort(array)).toEqual(expectResult);
});

