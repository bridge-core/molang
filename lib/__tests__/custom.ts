import { CustomMoLang } from '../custom/main'

test('Custom syntax', () => {
	const customMoLang = new CustomMoLang({})

	customMoLang.parse(
		"function('sq', 'base', { return math.pow(arg.base, 2); });function('on_axis', 'axis', { return arg.axis == 'x' ? v.x : v.y; });"
	)
	console.log(customMoLang.functions)

	console.log(customMoLang.transform("f.sq(2) * f.on_axis('x')"))
})
