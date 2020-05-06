import { createNode } from './AST/create'
import { addNode as AddASTNode, addNodes as AddASTNodes } from './AST/NodeLib'

export function parse(expression: string) {}
export namespace AST {
	export const create = (expression: string) => {
		return createNode(expression)
	}
	export const addNode = AddASTNode
	export const addNodes = AddASTNodes
}
export * from './AST/Nodes/export'
