import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class AssignmentNode extends BinaryNode {
	type = 'MoLang.AssignmentNode'
	constructor(getSplitStrings: () => string[]) {
		super('=', getSplitStrings)
	}

	eval(): TEvalResult {
		const [val1, val2] = this.evalHelper()

		return [false, val1 + val2]
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
