import { AST } from '../main'

const TESTS: [string, number | string][] = [
	['1 + 6', 7],
	['1 * 4', 4],
	['(1 + 3) * 4', 16],
	['(1 + 3) * (3 + 1)', 16],
	["'test' == 'test2'", 0],
	['1 + 6', 7],
	['0 <= 0', 1.0],
	['0 == 0', 1.0],
	['0 != 0', 0.0],
	['((7 * 0) + 1) / 2', 0.5],
	['4 / 2 == 2', 1],
	['1 == 1 && 0 == 0', 1],
	['0 ? 1 : 2', 2],
	['(0 ? 1 : 2) ? 3 : 4', 3],
	['0 ? 1 : 2; return 1', 1],
	["(1 && 0) + 1 ? 'true' : 'false'", 'true'],
	// ["variable.temp = 'test'", 1],
	// ['variable.temp', 'test'],
	// ["variable.temp == 'test'", 1],
	// ['query.get_equipped_item_name(0)', 'diamond_sword_0'],
	// ['query.get_equipped_item_name(1)', 'diamond_sword_1'],
	// ['math.add(1, 5)', 6],
	// ['rider(1).slot', 1],
	// ['rider(1).is(math.add(1, 5))', 6],
	// ['Texture.variants[Texture.variants.length - 1]', 6],
	// ['Texture.variants[1 * 3]', 4],
	// ['Texture.variants[math.add(1, 3)]', 5],
	// ['math.add(rider(0).get_length(Texture.variants[0]) + 5, 6)', 12],
	// ['query.get_position(0) >= 0 &&  query.get_position(0) <= 0', 1.0],
	// ['!(1 + 3) && query.test_something_else', 0],
	// [
	// 	"dragon.get_attack_anim('head') + dragon.test.something_else(0, 4, 66)",
	// 	0,
	// ],
]

describe('MoLang.AST.create(string)', () => {
	TESTS.forEach(([t, res]) =>
		test(t, () => {
			const tree = AST.create(t)
			expect(tree.toString()).toBe(t)
			expect(tree.eval().value).toBe(res)
		})
	)
})
