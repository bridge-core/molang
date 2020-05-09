import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class GreaterOrEqualsNode extends BinaryNode {
	type = 'MoLang.GreaterOrEqualsNode'
	constructor(getSplitStrings: () => string[]) {
		super('>=', getSplitStrings)
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 >= val2 ? 1.0 : 0.0,
		}
	}
}

export function testGreaterOrEquals(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'>='
	)
	if (isCorrectToken)
		return new GreaterOrEqualsNode(<() => string[]>getSplitStrings)
}
