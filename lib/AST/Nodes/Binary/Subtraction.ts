import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class SubtractionNode extends BinaryNode {
	type = 'MoLang.SubtractionNode'
	constructor(getSplitStrings: () => string[]) {
		super('-', getSplitStrings)
	}

	eval(): TEvalResult {
		const [val1, val2] = this.evalHelper()

		return [false, val1 - val2]
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
