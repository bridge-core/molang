import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class AdditionNode extends BinaryNode {
	type = 'MoLang.AdditionNode'
	constructor(getSplitStrings: () => string[]) {
		super('+', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 + val2,
		}
	}
}

export function testAddition(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'+'
	)
	if (isCorrectToken) return new AdditionNode(<() => string[]>getSplitStrings)
}
