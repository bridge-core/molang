import { ASTNode } from './ASTNode'
import {
	NegationNode,
	IfNode,
	ConjunctionNode,
	DisjunctionNode,
	SmallerNode,
	SmallerOrEqualsNode,
	GreaterOrEqualsNode,
	GreaterNode,
	EqualsNode,
	NotEqualsNode,
	MultiplicationNode,
	DivisionNode,
	AdditionNode,
	SubtractionNode,
	NumberNode,
	GroupNode,
	StringNode,
	FunctionCallNode,
	PropertyNode,
} from './Nodes/export'
import { IfElseNode } from './Nodes/Ternary/IfElse'

export interface ICreateASTNode {
	new (): ASTNode
	priority: number
}

export function createNodeLib() {
	let ASTNodes: [string, ICreateASTNode][] = [
		['MoLang.NegationNode', NegationNode],
		['MoLang.IfElseNode', IfElseNode],
		['MoLang.IfNode', IfNode],

		['MoLang.ConjunctionNode', ConjunctionNode],
		['MoLang.DisjunctionNode', DisjunctionNode],

		['MoLang.SmallerOrEqualsNode', SmallerOrEqualsNode],
		['MoLang.SmallerNode', SmallerNode],
		['MoLang.GreaterOrEqualsNode', GreaterOrEqualsNode],
		['MoLang.GreaterNode', GreaterNode],
		['MoLang.EqualsNode', EqualsNode],
		['MoLang.NotEqualsNode', NotEqualsNode],

		['MoLang.MultiplicationNode', MultiplicationNode],
		['MoLang.DivisionNode', DivisionNode],
		['MoLang.AdditionNode', AdditionNode],
		['MoLang.SubtractionNode', SubtractionNode],

		['MoLang.NumberNode', NumberNode],
		['MoLang.GroupNode', GroupNode],
		['MoLang.StringNode', StringNode],

		['MoLang.FunctionCallNode', FunctionCallNode],
		['MoLang.PropertyNode', PropertyNode],
		// ['MoLang.UndefinedNode', UndefinedNode],
	]

	return {
		getASTNodes() {
			return ASTNodes
		},
		addNode(
			nodeName: string,
			Node: ICreateASTNode,
			sortAfterInsert = true
		) {
			const i = ASTNodes.findIndex(
				([currNodeName]) => currNodeName === nodeName
			)
			if (i !== -1) return (ASTNodes[i][1] = Node)

			ASTNodes = ASTNodes.concat([[nodeName, Node]])

			if (!sortAfterInsert) return
			ASTNodes = ASTNodes.sort(
				([_1, n1], [_2, n2]) => n2.priority - n1.priority
			)
		},
		addNodes(nodes: [string, ICreateASTNode][]) {
			nodes.forEach(([nodeName, Node]) =>
				this.addNode(nodeName, Node, false)
			)

			ASTNodes = ASTNodes.sort(
				([_1, n1], [_2, n2]) => n2.priority - n1.priority
			)
		},
	}
}
