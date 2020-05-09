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

	const nodes = nodeLib.getASTNodes()
	let i = 0
	while (i < nodes.length) {
		const node = new nodes[i][1]()

		const { isCorrectToken, getSplitStrings } = node.test(expression)
		if (isCorrectToken) {
			return node.createChildren(expression, getSplitStrings)
		}

		i++
	}

	throw new Error(`Invalid MoLang: "${expression}"`)
}
