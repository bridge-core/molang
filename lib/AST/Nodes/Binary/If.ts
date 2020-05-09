import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class IfNode extends BinaryNode {
	type = 'MoLang.IfNode'
	constructor(getSplitStrings: () => string[]) {
		super('?', getSplitStrings)
	}

	eval(): TEvalResult {
		return [
			false,
			this.children[0].eval()[1] ? this.children[1].eval()[1] : 0.0,
		]
	}
}

export function testIf(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'?'
	)
	if (isCorrectToken) return new IfNode(<() => string[]>getSplitStrings)
}
