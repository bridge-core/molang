import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class NotEqualsNode extends BinaryNode {
	type = 'MoLang.NotEqualsNode'
	constructor(getSplitStrings: () => string[]) {
		super('!=', getSplitStrings)
	}

	eval() {
		return {
			value: Number(
				this.children[0].eval().value != this.children[1].eval().value
			),
		}
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
