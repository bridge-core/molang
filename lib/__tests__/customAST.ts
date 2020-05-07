import { AST, FunctionCallNode } from '../main'

describe('MoLang.AST.addNode(string, node)', () => {
	const functions: { [str: string]: (...args: unknown[]) => string } = {
		'test.something': () => {
			return 'It works!'
		},
		'nest.function': (...args) => {
			return 'It works: ' + args.join(' - ')
		},
	}

	class MyCustomNode extends FunctionCallNode {
		toString() {
			return functions[this.children[0].toString()](
				...this.children.slice(1).map((c) => c.toString())
			)
		}
	}

	const myLib = AST.NodeLib.create()
	myLib.addNode('MoLang.FunctionCallNode', MyCustomNode)
	;[
		['test.something()', 'It works!'],
		[
			'nest.function(0, variable.bar, test.something()) + (variable.bar || variable.foo)',
			'It works: 0 - variable.bar - It works! + (variable.bar || variable.foo)',
		],
		['test.something() && 0', 'It works! && 0'],
	].forEach(([t, res]) =>
		test(t, () => expect(AST.create(t, myLib).toString()).toBe(res))
	)
})
