import { Interpreter } from "../main"

const TESTS: [string, string | number][] = [
    [ "1 + 6", 7 ],
    [ "((7 * 0) + 1) / 2", 0.5 ],
    ["(1.0 && 0.0) + 1.0 ? 'True' : 'False'", "True"],
    ["variable.temp = 'test'", 1],
    ["variable.temp", 'test'],
    ["variable.temp == 'test'", 1],
    ["query.get_equipped_item_name(0)", "diamond_sword_0"],
    ["query.get_equipped_item_name(1)", "diamond_sword_1"],
    ["math.add(1, 5)", 6],
    ["rider(1).slot", 1],
    ["rider(1).is(math.add(1, 5))", 6],
    ["Texture.variants[Texture.variants.length - 1]", 6],
    ["Texture.variants[1 * 3]", 4]
];

describe("interpreter.parse(string)", () => {
    let i = new Interpreter({
        variable: {},
        query: {
            get_equipped_item_name(slot: number) {
                return 'diamond_sword_' + slot;
            }
        },
        Texture: {
            variants: [1, 2, 3, 4, 5, 6]
        },
        math: {
            add(a: number, b: number) {
                return a + b;
            }
        },
        rider(slot: number) {
            return {
                get slot() {
                    return slot;
                },
                is(id: number) {
                    return id;
                }
            }
        }
    });

    TESTS.forEach(([test_str, expected]) => test(test_str, () => expect(i.parse(test_str)).toBe(expected)))
})