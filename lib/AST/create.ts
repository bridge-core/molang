import { createNodeLib } from './NodeLib'

export interface ITestResult {
	isCorrectToken: boolean
	getSplitStrings?: () => string[]
}

let defaultNodeLib: ReturnType<typeof createNodeLib>
export function setNodeLib(lib: ReturnType<typeof createNodeLib>) {
	defaultNodeLib = lib
}
export function createNode(
	expression: string,
	nodeLib?: ReturnType<typeof createNodeLib>
) {
	if (!nodeLib) nodeLib = defaultNodeLib

	expression = expression.trim()

	for (const [_, Node] of nodeLib.getASTNodes()) {
		const node = new Node()

		const { isCorrectToken, getSplitStrings } = node.test(expression)
		if (isCorrectToken)
			return node.createChildren(expression, getSplitStrings)
	}

	throw new Error(`Invalid MoLang: "${expression}"`)
}
