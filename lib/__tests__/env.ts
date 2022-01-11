import { MoLang } from '../main'

test('execute without provided env', () => {
	const molang = new MoLang()
	expect(molang.execute('math.pow(2,2)')).toBe(4)
})

// Test standard env
const molang = new MoLang()

const tests: Record<string, any> = {
	'query.any(1,1,2,3)': 1,
	'query.any(1,2,3)': 0,
	'query.all(1,1,2,3)': 0,
	'query.all(1,1,1,1)': 1,
	'query.in_range(1,1,2)': 1,
	'query.in_range(2,1,2)': 1,
	'query.in_range(3,1,2)': 0,
}

test('Standard Environment', () => {
	for (const test in tests) {
		expect(molang.execute(test)).toBe(tests[test])
	}
})
