import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class SubtractionNode extends BinaryNode {
	type = 'MoLang.SubtractionNode'
	constructor(getSplitStrings: () => string[]) {
		super('-', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 - val2,
		}
	}
}

export function testSubtraction(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'-'
	)
	if (isCorrectToken)
		return new SubtractionNode(<() => string[]>getSplitStrings)
}
