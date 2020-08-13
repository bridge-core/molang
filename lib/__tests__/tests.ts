import { evalMoLang } from '../main'

const TESTS: [string, number | string][] = [
	['1 + 1', 2],
	['1 + 1 * 2', 3],
	['return 1', 0], //Your typical Minecraft quirk
	['return 1;', 1],
	['-(1 + 1)', -2],
	['(1 + 1) * 2', 4],
	['(1 + 1) * (1 + 1)', 4],
	["'test' == 'test2'", 0],
	['0 <= 0', 1.0],
	['0 == 0', 1.0],
	['0 != 0', 0.0],
	['((7 * 0) + 1) / 2', 0.5],
	['4 / 2 == 2', 1],
	['1 == 1 && 0 == 0', 1],
	['0 ? 1 : 2', 2],
	['(0 ? 1 : 2) ? 3 : 4', 3],
	['0 ? 1 : 2; return 1;', 1],
	["(1 && 0) + 1 ? 'true' : 'false'", 'true'],
	["!(1 && 0) ? 'true' : 'false'", 'true'],
	// ["query.get_position(0) >= 0 ? 'hello'", 'hello'],
	// ["query.get_position(0) < 0 ? 'hello'", 0.0],
	// ["variable.temp = 'test'", 0],
	// ['variable.temp', 'test'],
	// ["variable.temp == 'test'", 1],
	// ['variable.foo = 1.0 ? 0 : 1', 0],
	// ['variable.foo', 0],
	// ['query.get_equipped_item_name(0)', 'diamond_sword_0'],
	// ['query.get_equipped_item_name(1)', 'diamond_sword_1'],
	// ['math.add(1, 5)', 6],
	// ['rider.slot', 1],
	// ['rider.is(math.add(1, 5))', 6],
	// ['texture.variants[0]', '1'],
	// ['texture.mark_variants[0] = 2', 0],
	// ['texture.mark_variants[0]', 2],
	// ['texture.variants[texture.variants.length - 1]', 6],
	// ['texture.variants[texture.variants[5]]', 6],
	// ['texture.variants[math.add(1, 3)]', 5],
	// ['math.add(rider.get_length(texture.variants[0]) + 5, 6)', 12],
	// ['query.get_position(0) >= 0 && query.get_position(0) <= 0', 1.0],
	// ['!(1 + 3) && query.test_something_else', 0],
]

describe('parse(string)', () => {
	// setENV({
	// 	length(arr: unknown[]) {
	// 		return arr.length
	// 	},
	// 	variable: {},
	// 	query: {
	// 		get_equipped_item_name(slot: number) {
	// 			return 'diamond_sword_' + slot
	// 		},
	// 		get_position() {
	// 			return 0
	// 		},
	// 	},
	// 	texture: {
	// 		mark_variants: [],
	// 		variants: ['1', 2, 3, 4, 5, 6],
	// 	},
	// 	math: {
	// 		add(a: number, b: number) {
	// 			return a + b
	// 		},
	// 	},
	// 	rider: {
	// 		slot: 1,
	// 		is(id: number) {
	// 			return id
	// 		},
	// 		get_length(str: string) {
	// 			return str.length
	// 		},
	// 	},
	// })
	TESTS.forEach(([t, res]) => {
		test(`"${t}" => ${res}`, () => {
			expect(evalMoLang(t)).toBe(res)
		})
	})
})
