import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class AssignmentNode extends BinaryNode {
	type = 'MoLang.AssignmentNode'
	constructor(getSplitStrings: () => string[]) {
		super('=', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 + val2,
		}
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
