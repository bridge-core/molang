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
		'return ({t.scvar0=0;t.scvar1=0;loop(4,t.scvar0==0?{t.scvar0=1;}:{t.scvar2=t.scvar0;t.scvar0=t.scvar0+t.scvar1;t.scvar1=t.scvar2;});t.scvar3=t.scvar0;}+t.scvar3);'
	)
	expect(
		customMoLang.transform('f.pow(2, f.pow(2,2)) + f.fibonacci(0)')
	).toBe(
		'return 16+({t.scvar0=0;t.scvar1=0;loop(0,t.scvar0==0?{t.scvar0=1;}:{t.scvar2=t.scvar0;t.scvar0=t.scvar0+t.scvar1;t.scvar1=t.scvar2;});t.scvar3=t.scvar0;}+t.scvar3);'
	)
	expect(customMoLang.transform('f.sq(2)')).toBe('(math.pow(2,2))')
	expect(customMoLang.transform("f.sq(f.on_axis('x'))")).toBe(
		'(math.pow((v.x),2))'
	)

	expect(customMoLang.transform('f.get_axis(t.axis)')).toBe(
		'return ({t.axis==x?{t.scvar0=v.x;}:0;t.axis==y?{t.scvar0=v.y;}:0;t.scvar0=v.z;}+t.scvar0);'
	)
	expect(customMoLang.transform('t.x = 1; f.sq(2);')).toBe(
		't.x=1;(math.pow(2,2));'
	)
	expect(customMoLang.transform('t.x = 1; return f.sq(2);')).toBe(
		't.x=1;return (math.pow(2,2));'
	)
})
