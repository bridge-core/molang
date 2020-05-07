import { setNodeLib } from './AST/create'
import { createNodeLib } from './AST/NodeLib'
import { ExecutionGroupNode } from './AST/Nodes/ExecutionGroup'

const defaultLib = createNodeLib()
export function parse(expression: string) {}
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
