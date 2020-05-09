import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class DivisionNode extends BinaryNode {
	type = 'MoLang.DivisionNode'

	constructor(getSplitStrings: () => string[]) {
		super('/', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 / val2,
		}
	}
}

export function testDivision(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'/'
	)
	if (isCorrectToken) return new DivisionNode(<() => string[]>getSplitStrings)
}
