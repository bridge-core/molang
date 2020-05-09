import { setNodeLib } from './AST/create'
import { createNodeLib } from './AST/NodeLib'
import { ExecutionGroupNode } from './AST/Nodes/ExecutionGroup'
import { ASTNode } from './AST/ASTNode'
import { CONFIG } from './config'

const defaultLib = createNodeLib()
export const CACHE = new Map<string, ASTNode>()
export function resetCache() {
	CACHE.clear()
}
export function parse(expression: string, useCache = true) {
	setNodeLib(defaultLib)
	CONFIG.set('useCache', useCache)

	const tryCast = Number(expression)
	if (!Number.isNaN(tryCast)) return tryCast

	if (useCache && CACHE.has(expression))
		return (<ASTNode>CACHE.get(expression)).eval()[1]

	const ast = new ExecutionGroupNode(expression.toLowerCase())
	if (useCache) CACHE.set(expression, ast)

	return ast.eval()[1]
}
export { setENV } from './AST/ENV'

export namespace AST {
	export const create = (expression: string, nodeLib = defaultLib) => {
		setNodeLib(nodeLib)
		return new ExecutionGroupNode(expression.toLowerCase())
	}
	export namespace NodeLib {
		export const create = createNodeLib
	}
}
export * from './AST/Nodes/export'
