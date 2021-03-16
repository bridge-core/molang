import { CustomMoLang } from '../custom/main'

test('Custom syntax', () => {
	const customMoLang = new CustomMoLang({})

	customMoLang.parse(
		"function('sq', 'base', { return math.pow(arg.base, 2); });function('on_axis', 'axis', { return arg.axis == 'x' ? v.x : v.y; });"
	)

	expect(customMoLang.transform("f.sq(f.on_axis('x'))")).toMatch(
		'return ({t.bridge_func_0=math.pow(({t.bridge_func_1=v.x;}+t.bridge_func_1),2);}+t.bridge_func_0);'
	)
})
