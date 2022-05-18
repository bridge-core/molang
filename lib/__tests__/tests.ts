import { Context, ExecutionEnvironment } from '../env/env'
import { MoLang } from '../main'
import MolangJs from 'molangjs'

const TESTS: [string, number | string][] = [
	/**
	 * Basic tests
	 */
	['true', 1.0],
	['false', 0.0],
	['(0.5f) + 1', 1.5],
	['false ? 5', 0],
	['true ? 5', 5],
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
	['return 0 ? 1;', 0],
	['return 1 ? 1;', 1],
	['(0 ? 1 : 2) ? 3 : 4', 3],
	// MoLang should parse A?B?C:D:E as A?(B?C:D):E
	['q.variant == 11 ? 1 ? 2 : 0 : q.variant == 27', 2],
	// MoLang should parse A?B:C?D:E as A?B:(C?D:E), not (A?B:C)?D:E
	['q.variant == 11 ? 1 : q.variant == 27 ? 2 : 0', 1],
	['t.v = 1 ? 2 : 1; return t.v;', 2],
	//  MoLang should parse "A && B || C" as "(A && B) || C"
	['t.v = 0; return ({t.v = 1;}+1) && 0 || t.v;', 1],
	// MoLang should parse "A == C > D" as "A == (C > D)"
	['2 == 2 > 0', 0],
	['0 ? 1 : 2; return 1;', 1],
	["(1 && 0) + 1 ? 'true' : 'false'", 'true'],
	["!(1 && 0) ? 'true' : 'false'", 'true'],
	['v.x ?? 1', 1],
	['(variable.non_existent ?? 3) + (variable.existent ?? 9)', 5],

	/**
	 * Advanced syntax: Loops, break, continue & scope
	 */
	['1.0 ? { return 1; };', 1],
	['1.0 ? { variable.scope_test = 1; return variable.scope_test; };', 1],
	['v.x = 0; loop(10, v.x = v.x + 1); return v.x;', 10],
	['v.x = 0; loop(10, { v.x = v.x + 1; }); return v.x;', 10],
	['v.x = 2; loop(10, { return 1; }); return v.x;', 1],
	['v.x = 2; loop(0, { return 1; }); return v.x;', 2],
	[
		't.total = 0; for_each(t.current, texture.skin_id, { t.total = t.total + t.current; }); return t.total;',
		55,
	],
	[
		't.total = 0; for_each(t.current, texture.skin_id, { loop(10, t.total = t.total + t.current); }); return t.total;',
		550,
	],
	[
		't.total = 0; for_each(t.current, texture.skin_id, { math.mod(t.current, 2) ? continue; t.total = t.total + t.current; }); return t.total;',
		30,
	],
	['v.x = 2; loop(10, { break; return 1; }); return v.x;', 2],
	['{ variable.test = 1; variable.test_2 = 2; };', 0],
	[
		'{ ({ variable.test = 1; variable.test_2 = 2; }); variable.test_3 = 3; };',
		0,
	],

	/**
	 * Function calls & variable lookups
	 */
	['(Math.Random(0,0))', 0],
	['2 + Math.pow(2, 3)', 10],
	['test(1+1, 3+3)', 8],
	["query.get_position >= 0 ? 'hello' : 'test'", 'hello'],
	["return query.get_position(0) < 0 ? 'hello';", 0.0],
	["variable.temp = 'test'", 0],
	['variable.temp', 'test'],
	["variable.temp == 'test'", 1],
	['variable.foo = 1.0 ? 0 : 1', 0],
	['variable.foo', 0],
	['query.get_equipped_item_name(0)', 'diamond_sword_0'],
	['query.get_equipped_item_name(1)', 'diamond_sword_1'],
	['math.add(1, 5)', 6],
	['rider.slot', 1],
	['rider.is(math.add(1, 5))', 6],
	['texture.variants[0]', '1'],
	['texture.mark_variants[0] = 2', 0],
	['texture.mark_variants[0]', 2],
	['texture.variants[texture.variants[5]]', 6],
	['texture.variants[math.add(1, 3)]', 5],
	['math.add(rider.get_length(texture.variants[0]) + 5, 6)', 12],
	['query.get_position(0) >= 0 && query.get_position(0) <= 0', 1.0],
	['!(1 + 3) && query.test_something_else', 0],
	[
		'({ query.get_position ? {return 0;}; variable.return_value = 1; } + variable.return_value)',
		1,
	],
	['v.foo ? 1.0 : texture.variants[0]', '1'],

	/**
	 * Function calls + property access
	 *
	 * Disabled until we actually support these patterns
	 */
	// ['c.position().x', 1],
	// ['c.position.y', 2],

	/**
	 * Context
	 */
	['context.other->query.test * context.other->query.test', 1],
	['context.not_a_valid.context->query.test', 0],

	// Test comments
	['1; # return 0;\n return 2;', 2],
]

const env = {
	test(n1: number, n2: number) {
		return n1 + n2
	},
	length(arr: unknown[]) {
		return arr.length
	},
	variable: {
		existent: 2,
	},
	query: {
		get_equipped_item_name(slot: number) {
			return 'diamond_sword_' + slot
		},
		get_position() {
			return 0
		},
		variant: 11,
	},
	texture: {
		mark_variants: [],
		variants: ['1', 2, 3, 4, 5, 6, 6],
		skin_id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	},
	math: {
		add(a: number, b: number) {
			return a + b
		},
	},
	rider: {
		slot: 1,
		is(id: number) {
			return id
		},
		get_length(str: string) {
			return str.length
		},
	},
	context: {
		other: new Context({
			query: {
				test: 1,
			},
		}),
		position: () => ({
			x: 1,
			y: 2,
		}),
	},
}

describe('parse(string)', () => {
	const molang = new MoLang(env, { useOptimizer: false })
	const molangJs = new MolangJs()
	const flatEnv = new ExecutionEnvironment(env, { isFlat: false }).get()

	TESTS.forEach(([t, res]) => {
		test(`Optimizer<false>: "${t}" => ${res}`, () => {
			expect(molang.execute(t)).toBe(res)
		})
		molang.updateConfig({ useOptimizer: true })
		test(`Optimizer<true>: "${t}" => ${res}`, () => {
			expect(molang.execute(t)).toBe(res)
		})

		// test(`MolangJS: "${t}" => ${res}`, () => {
		// 	expect(molangJs.parse(t, flatEnv)).toBe(res)
		// })
	})
})
