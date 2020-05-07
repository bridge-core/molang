import { createNode } from './AST/create'
import { createNodeLib } from './AST/NodeLib'

const defaultLib = createNodeLib()
export function parse(expression: string) {}
export namespace AST {
	export const create = (expression: string, nodeLib = defaultLib) => {
		return createNode(expression.toLowerCase(), nodeLib)
	}
	export namespace NodeLib {
		export const create = createNodeLib
	}
}
export * from './AST/Nodes/export'
