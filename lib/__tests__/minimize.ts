import { Molang } from '../main'

test('Parse & stringify statements', () => {
	const molang = new Molang(undefined, {
		useCache: false,
		useOptimizer: true,
		useAgressiveStaticOptimizer: true,
		keepGroups: true,
		earlyReturnsSkipTokenization: false,
		earlyReturnsSkipParsing: false,
	})

	const minimize = (str: string) =>
		molang.minimize(molang.parse(str)).toString()

	const tests = {
		'query.position()': 'q.position()',
		'variable.x = 1; return variable.x;': 'v.v0=1;return v.v0;',
		'20 + 50': '70',
	}

	for (const [test, result] of Object.entries(tests)) {
		expect(minimize(test)).toBe(result)
	}
})
