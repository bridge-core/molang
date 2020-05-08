import { setNodeLib } from './AST/create'
import { createNodeLib } from './AST/NodeLib'
import { ExecutionGroupNode } from './AST/Nodes/ExecutionGroup'
import { ASTNode } from './AST/ASTNode'

const defaultLib = createNodeLib()
const CACHE = new Map<string, ASTNode>()
export function resetCache() {
	CACHE.clear()
}
export function parse(expression: string, useCache = true) {
	setNodeLib(defaultLib)
	if (useCache && CACHE.has(expression))
		return (<ASTNode>CACHE.get(expression)).eval()
	const ast = new ExecutionGroupNode().createChildren(
		expression.toLowerCase()
	)
	CACHE.set(expression, ast)

	return ast.eval().value
}
export { setENV } from './AST/ENV'

export namespace AST {
	export const create = (expression: string, nodeLib = defaultLib) => {
		setNodeLib(nodeLib)
		return new ExecutionGroupNode().createChildren(expression.toLowerCase())
	}
	export namespace NodeLib {
		export const create = createNodeLib
	}
}
export * from './AST/Nodes/export'
