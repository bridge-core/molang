import { Molang } from '../lib/Molang'
import { test, expect } from 'vitest'

test('Molang.resolveStatic(expr)', () => {
	const molang = new Molang(
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
		'0-v.test': '-v.test',
		'0+v.test': 'v.test',
		
		'v.test/1': 'v.test',
		'v.test*1': 'v.test',
		'1*v.test': 'v.test',
		'1/v.test': '1/v.test',
		'v.test/0': 'v.test/0', //While the molang specs state that this returns 0, we do not optimize this as it is a clear error of the programmer, so it should be kept for visibility
		'0/v.test': '0',
		'0*v.test': '0',
		
		//Test rearrangement
		'math.sin(query.life_time*180*.5-5)*4*0.2-0.1233' : '0.8*math.sin(90*query.life_time-5)-0.1233',
		'3 * 10 * 0.3 * v.test * 10 * 20 * 100' : '180000*v.test',
		'3 * 10 * 0.3 + 10 * v.test * 10 * 20 * 100' : '9+200000*v.test',
		'1+v.test+2': '3+v.test',
		'3 * 10 * 0.3 * v.test * 10 * v.x * 100' : '9000*v.test*v.x',
		'3 + 10 + 1 * 0.2 * v.test * 10 * v.x * 100 + 10'  : '23+200*v.test*v.x',
		'math.cos(((query.life_time - 2.0) * 180 / 3)) * 0.05 + 1' : 'math.cos((60*(query.life_time-2)))*0.05+1',
		'math.cos(((query.life_time - 2.0) / 180 / 3)) * 0.05 + 1' : 'math.cos(((query.life_time-2)/540))*0.05+1',
		'math.cos(((query.life_time - 2.0) / 180 * 3)) * 0.05 + 1' : 'math.cos((60*(query.life_time-2)))*0.05+1',
		'3 / 10 * 0.3 * v.test * 20 * v.x / 100' : '0.018*v.test*v.x',
		'3 - 10 + 0.3 + v.test * 20 * v.x+ 20 - 100' : '-86.7+v.test*20*v.x',
		'3 - 10 - 2 - v.test - 2 - 5 - 20' : '-36-v.test',
		'3 - 10 - 2 - v.test - 2 - 5 + 1 - 20' : '-35-v.test',
		'3 - 10 - 2 - v.test - 2 - 5 + 1 - 20 + (34 * 10 - 30) / 2' : '120-v.test',
		'3 - 10 - 2 - v.test - 2 - 5 + 1 - 20 + (34 * 10 - 30 * v.x) / 2' : '-35-v.test+(340-30*v.x)/2',

		//More Tests, making sure of the order of operations
		'1 + 2 * 3': '7',
		'(1 + 2) * 3': '9',
		'1 + 2 * 3 + 4': '11',
		'(1 + 2) * (3 + 4)': '21',
		'1 + 2 * 3 + 4 * 5': '27',

		//Test common subexpression elimination
		'v.test + v.test': '2*v.test',
		'v.test - v.test': '0',
	}

	for (const [test, result] of Object.entries(tests)) {
		const ast = molang.parse(test)

		expect(molang.resolveStatic(ast).toString()).toBe(result)
	}
})
