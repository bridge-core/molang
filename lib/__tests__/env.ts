import { MoLang } from '../main'

test('execute without provided env', () => {
	const molang = new MoLang()
	expect(molang.execute('math.pow(2,2)')).toBe(4)
})
