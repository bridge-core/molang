import { ChainNode, testChainHelper } from '../../ASTNode'

export class IfElseNode extends ChainNode {
	type = 'MoLang.IfElseNode'
	constructor(getSplitStrings: () => string[]) {
		super('?:', getSplitStrings)
	}

	eval() {
		if (this.children[0].eval()[1]) {
			return this.children[1].eval()
		} else {
			return this.children[2].eval()
		}
	}
}

export function testIfElse(expression: string) {
	const { isCorrectToken, getSplitStrings } = testChainHelper(
		expression,
		'?:'
	)
	if (isCorrectToken) return new IfElseNode(<() => string[]>getSplitStrings)
}
