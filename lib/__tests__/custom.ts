import { parseCustomSyntax } from '../custom/main'
import { getFromEnv, setEnv } from '../env'

test('Custom syntax', () => {
	setEnv({})
	parseCustomSyntax(
		"function('sq', 'base', { return math.pow(arg.base, 2); })"
	)

	expect(parseCustomSyntax('function.sq(2)')).toBe(4)
})
