import { test, expect } from 'vitest'
import { tree2Array } from './index'
test("tree2Array", () => {
    const tree = [{
        id: 0,
        children: [
            {
                id: 1,
                children: [
                    {
                        id: 3,
                        children: [
                            {
                                id: 4,
                            }, {
                                id: 5
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
            }
        ]
    }]
    const expectResult = [{ id: 0, pid: null }, { id: 1, pid: 0 }, { id: 3, pid: 1 }, { id: 4, pid: 3 }, { id: 5, pid: 3 }, { id: 2, pid: 0 }]
    expect(tree2Array(tree)).toEqual(expectResult);
});

