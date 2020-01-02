import { Interpreter } from "../main"

const TESTS: [string, string | number][] = [
    [ "1 + 6", 7 ],
    [ "((7 * 0) + 1) / 2", 0.5 ],
    ["(1.0 && 0.0) + 1.0 ? 'True' : 'False'", "True"]
];

describe("interpreter.parse(string)", () => {
    let i = new Interpreter({});

    TESTS.forEach(([test_str, expected]) => test(test_str, () => expect(i.parse(test_str)).toBe(expected)))
})