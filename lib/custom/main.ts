import { ExecutionEnvironment } from '../env'
import { MoLangParser } from '../parser/molang'
import { Tokenizer } from '../tokenizer/main'
import { CustomFunctionParselet } from './function'

export class CustomMoLangParser extends MoLangParser {
	constructor(useOptimizer = true, agressiveStaticOptimizer = true) {
		super(useOptimizer, agressiveStaticOptimizer)

		this.registerPrefix('FUNCTION', new CustomFunctionParselet())
	}
}

const parser = new CustomMoLangParser()
parser.setExecutionEnvironment(new ExecutionEnvironment({}))
parser.setTokenizer(new Tokenizer(new Set(['function'])))

export function parseCustomSyntax(expression: string) {
	parser.init(expression)
	const abstractSyntaxTree = parser.parseExpression()

	return abstractSyntaxTree.eval()
}
