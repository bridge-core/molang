import { AST } from '../main'

const STRING_TESTS: string[] = [
	'1 + 6',
	'1 * 4',
	'(1 + 3) * 4',
	'(1 + 3) * (3 + 1)',
	"'test' == 'test2'",
	'!(1 + 3) && query.test_something_else',
	"dragon.get_attack_anim('head') + dragon.test.something_else(0, 4, 66)",
	'0 ? 1 : 2',
	'(0 ? 1 : 2) ? 3 : 4',
]

describe('MoLang.AST.create(string)', () => {
	STRING_TESTS.forEach((t) =>
		test(t, () => expect(AST.create(t).toString()).toBe(t))
	)
})
