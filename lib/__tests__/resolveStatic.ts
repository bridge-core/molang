import { MoLang } from '../MoLang'

test('MoLang.resolveStatic(expr)', () => {
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

	const tests: Record<string, string> = {
		'v.test*0': '0',

		'v.test+0': 'v.test',
		'v.test-0': 'v.test',

		'v.test/1': 'v.test',
		'v.test*1': 'v.test',
	}

	for (const [test, result] of Object.entries(tests)) {
		const ast = molang.parse(test)

		expect(molang.resolveStatic(ast).toString()).toBe(result)
	}
})
