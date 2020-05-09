import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class GreaterNode extends BinaryNode {
	type = 'MoLang.GreaterNode'
	constructor(getSplitStrings: () => string[]) {
		super('>', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: Number(val1 > val2),
		}
	}
}

export function testGreater(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'>'
	)
	if (isCorrectToken) return new GreaterNode(<() => string[]>getSplitStrings)
}
