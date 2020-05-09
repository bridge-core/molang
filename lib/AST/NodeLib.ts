import { ASTNode } from './ASTNode'
import {
	IfElseNode,
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
	NegationNode,
	ReturnNode,
	MakeNegativeNode,
	AssignmentNode,
	testNumber,
	testIfElse,
	testIf,
	testConjunction,
	testDisjunction,
	testSmallerOrEquals,
	testSmaller,
	testGreaterOrEquals,
	testGreater,
	testEquals,
	testNotEquals,
	testAddition,
	testSubtraction,
	testMultiplication,
	testDivision,
	testGroup,
	testString,
	testProperty,
	testReturn,
	testNegation,
	testMakeNegative,
	testFunctionCall,
} from './Nodes/export'

export interface ICreateASTNode {
	new (): ASTNode
	priority: number
}

export function createNodeLib() {
	let ASTNodes: [string, (expression: string) => ASTNode | undefined][] = [
		['MoLang.NumberNode', testNumber],
		['MoLang.ReturnNode', testReturn],
		// ['MoLang.AssignmentNode', AssignmentNode],

		['MoLang.IfElseNode', testIfElse],
		['MoLang.IfNode', testIf],

		['MoLang.ConjunctionNode', testConjunction],
		['MoLang.DisjunctionNode', testDisjunction],

		['MoLang.SmallerOrEqualsNode', testSmallerOrEquals],
		['MoLang.SmallerNode', testSmaller],
		['MoLang.GreaterOrEqualsNode', testGreaterOrEquals],
		['MoLang.GreaterNode', testGreater],
		['MoLang.EqualsNode', testEquals],
		['MoLang.NotEqualsNode', testNotEquals],

		['MoLang.AdditionNode', testAddition],
		['MoLang.SubtractionNode', testSubtraction],
		['MoLang.MultiplicationNode', testMultiplication],
		['MoLang.DivisionNode', testDivision],

		['MoLang.NegationNode', testNegation],
		['MoLang.MakeNegativeNode', testMakeNegative],

		['MoLang.GroupNode', testGroup],
		['MoLang.StringNode', testString],

		['MoLang.FunctionCallNode', testFunctionCall],
		['MoLang.PropertyNode', testProperty],
		// ['MoLang.UndefinedNode', UndefinedNode],
	]

	return {
		getASTNodes() {
			return ASTNodes
		},
		addNode(
			nodeName: string,
			testNode: (expression: string) => ASTNode | undefined,
			sortAfterInsert = true
		) {
			const i = ASTNodes.findIndex(
				([currNodeName]) => currNodeName === nodeName
			)
			if (i !== -1) return (ASTNodes[i][1] = testNode)

			ASTNodes = ASTNodes.concat([[nodeName, testNode]])

			if (!sortAfterInsert) return
			// ASTNodes = ASTNodes.sort(
			// 	([_1, n1], [_2, n2]) => n2.priority - n1.priority
			// )
		},
		addNodes(
			nodes: [string, (expression: string) => ASTNode | undefined][]
		) {
			nodes.forEach(([nodeName, testNode]) =>
				this.addNode(nodeName, testNode, false)
			)

			// ASTNodes = ASTNodes.sort(
			// 	([_1, n1], [_2, n2]) => n2.priority - n1.priority
			// )
		},
	}
}
