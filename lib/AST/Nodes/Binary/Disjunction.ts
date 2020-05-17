import { BinaryNode, testBinaryHelper, TEvalResult } from '../../ASTNode'

export class DisjunctionNode extends BinaryNode {
	type = 'MoLang.DisjunctionNode'
	constructor(getSplitStrings: () => string[]) {
		super('||', getSplitStrings)
	}

	eval(): TEvalResult {
		return [false, this.children[0].eval()[1] && this.children[1].eval()[1]]
	}
}

export function testDisjunction(expression: string) {
	const { isCorrectToken, getSplitStrings } = testBinaryHelper(
		expression,
		'||'
	)
	if (isCorrectToken)
		return new DisjunctionNode(<() => string[]>getSplitStrings)
}
