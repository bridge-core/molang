import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class EqualsNode extends BinaryNode {
	type = 'MoLang.EqualsNode'
	constructor(getSplitStrings: () => string[]) {
		super('==', getSplitStrings)
	}

	eval(): TEvalResult {
		return [
			false,
			this.children[0].eval()[1] == this.children[1].eval()[1]
				? 1.0
				: 0.0,
		]
	}
}

export function testEquals(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'=='
	)
	if (isCorrectToken) return new EqualsNode(<() => string[]>getSplitStrings)
}