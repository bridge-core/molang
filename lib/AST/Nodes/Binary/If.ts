import { BinaryNode, testBinaryHelper } from '../../ASTNode'

export class IfNode extends BinaryNode {
	type = 'MoLang.IfNode'
	constructor(getSplitStrings: () => string[]) {
		super('?', getSplitStrings)
	}

	eval() {
		return {
			value: this.children[0].eval().value
				? this.children[1].eval().value
				: 0.0,
		}
	}
}

export function testIf(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'?'
	)
	if (isCorrectToken) return new IfNode(<() => string[]>getSplitStrings)
}
