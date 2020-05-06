import { getASTNodes } from './NodeLib'

export interface ITestResult {
	isCorrectToken: boolean
	getSplitStrings?: () => string[]
}

export function createNode(expression: string) {
	expression = expression.trim()

	for (const [nodeName, Node] of getASTNodes()) {
		const node = new Node()
		const { isCorrectToken, getSplitStrings } = node.test(expression)
		if (isCorrectToken)
			return node.createChildren(expression, getSplitStrings)
	}

	throw new Error(`Invalid MoLang: ${expression}`)
}
