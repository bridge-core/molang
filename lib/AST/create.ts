import { createNodeLib } from './NodeLib'
import { CONFIG } from '../config'

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
	nodeLib?: ReturnType<typeof createNodeLib>,
	useOptimizer = CONFIG.get('useOptimizer'),
	startIndex = 0
) {
	if (!nodeLib) nodeLib = defaultNodeLib

	expression = expression.trim()
	if (useOptimizer)
		while (removeBrackets(expression)) {
			expression = expression.substring(1, expression.length - 1)
		}

	const nodes = defaultNodeLib.getASTNodes()
	let i = startIndex
	while (i < nodes.length) {
		const node = nodes[i++][1](expression)
		if (node) return node
	}

	throw new Error(`Invalid MoLang: "${expression}"`)
}

function removeBrackets(expression: string) {
	if (expression[0] !== '(' || expression[expression.length - 1] !== ')')
		return false

	let count = 0
	let i = 0
	while (i < expression.length - 1) {
		if (expression[i] === '(') {
			count++
		} else if (expression[i] === ')') {
			count--
		}
		if (count === 0) return false
		i++
	}
	return true
}
