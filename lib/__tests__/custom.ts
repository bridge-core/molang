import { CustomMoLang } from '../custom/main'

test('Custom syntax', () => {
	const customMoLang = new CustomMoLang({})

	customMoLang.parse(
		`
			function('sq', 'base', { return math.pow(arg.base, 2); });
			function('on_axis', 'axis', { return arg.axis == 'x' ? v.x : v.y; });
			function('fibonacci', 'total', {
				t.current = 0;
				t.prev = 0;
				loop(a.total, t.current == 0 ? {t.current = 1;} : {t.tmp = t.current; t.current = t.current + t.prev; t.prev = t.tmp;});
				return t.current;
			});
			function('pow', 'base', 'exp', {
				return a.exp == 0 ? 1 : a.base * f.pow(a.base, a.exp - 1);
			});

			# Comment test return 1; 
			function('get_axis', 'axis', {
				a.axis == 'x' ? { return v.x; };
				a.axis == 'y' ? { return v.y; };
				return v.z;
			});
		`
	)

	expect(customMoLang.transform('f.pow(2, 2)')).toBe('4')
	expect(customMoLang.transform('f.fibonacci(4)')).toBe(
		'({t.current=0;t.prev=0;loop(4,t.current==0?{t.current=1;}:{t.tmp=t.current;t.current=t.current+t.prev;t.prev=t.tmp;});t.bridge_func_0=t.current;}+t.bridge_func_0)'
	)
	expect(
		customMoLang.transform('f.pow(2, f.pow(2,2)) + f.fibonacci(0)')
	).toBe(
		'16+({t.current=0;t.prev=0;loop(0,t.current==0?{t.current=1;}:{t.tmp=t.current;t.current=t.current+t.prev;t.prev=t.tmp;});t.bridge_func_20=t.current;}+t.bridge_func_20)'
	)
	expect(customMoLang.transform('f.sq(2)')).toBe('(math.pow(2,2))')
	expect(customMoLang.transform("f.sq(f.on_axis('x'))")).toBe(
		'(math.pow((v.x),2))'
	)

	expect(customMoLang.transform('f.get_axis(t.axis)')).toBe(
		'({t.axis==x?{t.bridge_func_0=v.x;}:0;t.axis==y?{t.bridge_func_0=v.y;}:0;t.bridge_func_0=v.z;}+t.bridge_func_0)'
	)
})
