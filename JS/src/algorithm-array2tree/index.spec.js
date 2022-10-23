import { test, expect } from 'vitest'
import { array2Tree } from './index'
test("array2Tree", () => {
    const array = [{ id: 0, pid: null }, { id: 1, pid: 0 }, { id: 3, pid: 1 }, { id: 4, pid: 3 }, { id: 5, pid: 3 }, { id: 2, pid: 0 }]
    const expectResult = [{
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

    const tree = array2Tree(array)
    expect(tree).toEqual(expectResult);
});
