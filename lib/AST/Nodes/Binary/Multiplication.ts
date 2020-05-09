import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class MultiplicationNode extends BinaryNode {
	type = 'MoLang.MultiplicationNode'
	constructor(getSplitStrings: () => string[]) {
		super('*', getSplitStrings)
	}

	eval(): TEvalResult {
		const [val1, val2] = this.evalHelper()

		return [false, val1 * val2]
	}
}

export function testMultiplication(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'*'
	)
	if (isCorrectToken)
		return new MultiplicationNode(<() => string[]>getSplitStrings)
}
