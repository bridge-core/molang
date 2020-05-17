import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'
import { PropertyNode } from '../Other/Property'

export class AssignmentNode extends BinaryNode {
	type = 'MoLang.AssignmentNode'

	constructor(getSplitStrings: () => string[]) {
		super('=', getSplitStrings)
	}

	eval(): TEvalResult {
		return [
			false,
			(<PropertyNode>this.children[0]).set(this.children[1].eval()),
		]
	}
}

export function testAssignment(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'='
	)
	if (isCorrectToken)
		return new AssignmentNode(<() => string[]>getSplitStrings)
}
