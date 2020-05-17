import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class ConjunctionNode extends BinaryNode {
	type = 'MoLang.ConjunctionNode'
	constructor(getSplitStrings: () => string[]) {
		super('&&', getSplitStrings)
	}

	eval(): TEvalResult {
		return [false, this.children[0].eval()[1] && this.children[1].eval()[1]]
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
