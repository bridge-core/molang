import { MoLang } from '../main'

test('Parse & stringify statements', () => {
	const molang = new MoLang(
		{ 'variable.is_true': 1 },
		{
			useCache: false,
			useOptimizer: true,
			useAgressiveStaticOptimizer: true,
			keepGroups: true,
			earlyReturnsSkipTokenization: false,
			earlyReturnsSkipParsing: false,
		}
	)

	const tests = {
		'v.is_false ? v.x': 'v.is_false?v.x',
		'v.is_true ? v.x : v.y': 'v.is_true?v.x:v.y',
		'return v.test ? v.x : v.y;': 'return v.test?v.x:v.y;',
		'loop(10, {v.x = 1 + 2 * 4;}); return v.x;':
			'loop(10,{v.x=1+2*4;});return v.x;',
		'(v.x + v.y) * v.z': '(v.x+v.y)*v.z',
		"1 ? '1' : 'other'; return 1;": 'return 1;',
		"return 1 ? '1' : 'other';": "return '1';",
		"1 ? '1' : 'other'": "'1'",
		'array.t[v.t]': 'array.t[v.t]',
		'return -(1+1);': 'return -(1+1);',
	}

	for (const [test, result] of Object.entries(tests)) {
		expect(molang.parse(test).toString()).toBe(result)
	}
})
