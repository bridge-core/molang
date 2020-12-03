import { ExecutionEnvironment } from '../env'
import { MoLangParser } from '../parser/molang'
import { IIterator, tokenize } from '../tokenizer/tokenize'
import { CustomFunctionParselet } from './function'

export class CustomMoLangParser extends MoLangParser {
	constructor(useOptimizer = true, agressiveStaticOptimizer = true) {
		super(useOptimizer, agressiveStaticOptimizer)

		this.registerPrefix('FUNCTION', new CustomFunctionParselet())
	}
}

const parser = new CustomMoLangParser()
parser.setExecutionEnvironment(new ExecutionEnvironment({}))

export function parseCustomSyntax(expression: string) {
	parser.setTokenizer(tokenize(expression, new Set(['function'])))
	const abstractSyntaxTree = parser.parseExpression()

	return abstractSyntaxTree.eval()
}
