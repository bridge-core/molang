import { MoLang } from '../main'

test('Partial resolve', () => {
	const molang = new MoLang(
		{ 'variable.is_true': 1 },
		{
			partialResolveOnParse: true,
			useCache: false,
			useOptimizer: true,
		}
	)

	expect(molang.parse('v.is_true ? v.x : v.y').type).toMatch('NameExpression')

	molang.updateExecutionEnv({ 'variable.x': 42, 'variable.is_true': 1 })
	expect(molang.parse('v.is_true ? v.x : v.y').type).toMatch(
		'StaticExpression'
	)
	expect(molang.parse('v.is_true = 4; return v.is_true;').toString()).toMatch(
		'v.is_true=4;return 1;'
	)
	expect(molang.parse('v.something = 1; return v.something;').type).toMatch(
		'StatementExpression'
	)
})
