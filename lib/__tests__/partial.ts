import { MoLang } from '../main'

test('Partial resolve', () => {
	const molang = new MoLang(
		{ 'variable.is_true': 1 },
		{
			partialResolveOnParse: true,
			useCache: false,
			useOptimizer: true,
			useAgressiveStaticOptimizer: true,
		}
	)

	expect(molang.parse('v.is_true ? v.x : v.y').type).toMatch('NameExpression')

	molang.updateExecutionEnv({ 'variable.x': 42, 'variable.is_true': 1 })
	expect(molang.parse('v.is_true ? v.x : v.y').type).toMatch(
		'StaticExpression'
	)
})
