import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class MultiplicationNode extends BinaryNode {
	type = 'MoLang.MultiplicationNode'
	constructor(getSplitStrings: () => string[]) {
		super('*', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 * val2,
		}
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
