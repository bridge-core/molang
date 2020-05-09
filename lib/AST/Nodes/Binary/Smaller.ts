import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class SmallerNode extends BinaryNode {
	type = 'MoLang.SmallerNode'
	constructor(getSplitStrings: () => string[]) {
		super('<', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 < val2 ? 1.0 : 0.0,
		}
	}
}

export function testSmaller(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'<'
	)
	if (isCorrectToken) return new SmallerNode(<() => string[]>getSplitStrings)
}
