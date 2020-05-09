import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class SmallerOrEqualsNode extends BinaryNode {
	type = 'MoLang.SmallerOrEqualsNode'
	constructor(getSplitStrings: () => string[]) {
		super('<=', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: Number(val1 <= val2),
		}
	}
}

export function testSmallerOrEquals(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'<='
	)
	if (isCorrectToken)
		return new SmallerOrEqualsNode(<() => string[]>getSplitStrings)
}
