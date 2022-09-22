import { Molang } from '../lib/main'
import { describe, bench } from 'vitest'

describe('Molang minification', () => {
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

	const expressions = [
		'variable.hand_bob = query.life_time < 0.01 ? 0.0 : variable.hand_bob + ((query.is_on_ground && query.is_alive ? math.clamp(math.sqrt(math.pow(query.position_delta(0), 2.0) + math.pow(query.position_delta(2), 2.0)), 0.0, 0.1) : 0.0) - variable.hand_bob) * 0.02;',
	]

	for (const expression of expressions) {
		bench(expression, () => {
			minimize(expression)
		})
		console.log(minimize(expression))
	}
})
