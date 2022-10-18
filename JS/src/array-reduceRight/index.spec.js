import { test, expect } from 'vitest'
import './index'
test("reduce", () => {
    const array = [2, 4, 6, 8];
    const result = array.reduceRight((pre, curr) => pre + curr, 100)
    const result2 = array._reduceRight((pre, curr) => pre + curr,100)
    expect(result2).toEqual(result);
});

