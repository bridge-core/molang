import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class GreaterNode extends BinaryNode {
	type = 'MoLang.GreaterNode'
	constructor(getSplitStrings: () => string[]) {
		super('>', getSplitStrings)
	}

	eval(): TEvalResult {
		const [val1, val2] = this.evalHelper()

		return [false, val1 > val2 ? 1.0 : 0.0]
	}
}

export function testGreater(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'>'
	)
	if (isCorrectToken) return new GreaterNode(<() => string[]>getSplitStrings)
}