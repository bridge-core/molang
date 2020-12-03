import { parseCustomSyntax } from '../custom/main'

test('Custom syntax', () => {
	parseCustomSyntax(
		"function('sq', 'base', { return math.pow(arg.base, 2); })"
	)

	expect(parseCustomSyntax('function.sq(2)')).toBe(4)
})
