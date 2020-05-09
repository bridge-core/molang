import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class NotEqualsNode extends BinaryNode {
	type = 'MoLang.NotEqualsNode'
	constructor(getSplitStrings: () => string[]) {
		super('!=', getSplitStrings)
	}

	eval(): TEvalResult {
		return [
			false,
			Number(this.children[0].eval()[1] != this.children[1].eval()[1]),
		]
	}
}

export function testNotEquals(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'!='
	)
	if (isCorrectToken)
		return new NotEqualsNode(<() => string[]>getSplitStrings)
}
