import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class DivisionNode extends BinaryNode {
	type = 'MoLang.DivisionNode'

	constructor(getSplitStrings: () => string[]) {
		super('/', getSplitStrings)
	}

	eval(): TEvalResult {
		const [val1, val2] = this.evalHelper()

		return [false, val1 / val2]
	}
}

export function testDivision(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'/'
	)
	if (isCorrectToken) return new DivisionNode(<() => string[]>getSplitStrings)
}
