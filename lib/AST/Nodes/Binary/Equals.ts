import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class EqualsNode extends BinaryNode {
	type = 'MoLang.EqualsNode'
	constructor(getSplitStrings: () => string[]) {
		super('==', getSplitStrings)
	}

	eval() {
		return {
			value:
				this.children[0].eval().value == this.children[1].eval().value
					? 1.0
					: 0.0,
		}
	}
}

export function testEquals(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'=='
	)
	if (isCorrectToken) return new EqualsNode(<() => string[]>getSplitStrings)
}
