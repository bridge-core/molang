import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class ConjunctionNode extends BinaryNode {
	type = 'MoLang.ConjunctionNode'
	constructor(getSplitStrings: () => string[]) {
		super('&&', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 && val2,
		}
	}
}

export function testConjunction(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'&&'
	)
	if (isCorrectToken)
		return new ConjunctionNode(<() => string[]>getSplitStrings)
}
