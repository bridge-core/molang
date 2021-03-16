import { Parser } from '../parser/parse'
import { Token } from '../parser/../tokenizer/token'
import { IPrefixParselet } from '../parser/parselets/prefix'
import { Expression, IExpression } from '../parser/expression'
import { StringExpression } from '../parser/expressions/string'
import { StatementExpression } from '../parser/expressions/statement'
import { CustomMoLangParser } from './main'
import { GroupExpression } from '../parser/expressions/group'

export class CustomFunctionParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		parser.consume('LEFT_PARENT')
		if (parser.match('RIGHT_PARENT'))
			throw new Error(`function() called without arguments`)

		let args: string[] = []
		let functionBody: IExpression | undefined
		let functionName: string | undefined
		do {
			const expr = parser.parseExpression()
			if (expr instanceof StringExpression) {
				if (!functionName) functionName = <string>expr.eval()
				else args.push(<string>expr.eval())
			} else if (
				expr instanceof StatementExpression ||
				expr instanceof GroupExpression
			) {
				functionBody = expr
			} else {
				throw new Error(
					`Unexpected expresion: found "${expr.constructor.name}"`
				)
			}
		} while (parser.match('COMMA'))
		parser.consume('RIGHT_PARENT')

		if (!functionName)
			throw new Error(
				`Missing function() name (argument 1); found "${functionName}"`
			)
		if (!functionBody)
			throw new Error(
				`Missing function() body (argument ${args.length + 2})`
			)

		return new CustomFunctionExpression(
			(<CustomMoLangParser>parser).functions,
			functionName,
			args,
			functionBody
		)
	}
}

class CustomFunctionExpression extends Expression {
	type = 'CustomFunctionExpression'
	constructor(
		functions: Map<string, [string[], string]>,
		functionName: string,
		args: string[],
		protected functionBody: IExpression
	) {
		super()
		functions.set(functionName, [
			args,
			functionBody.toString().slice(1, -1),
		])
	}

	get allExpressions() {
		return [this.functionBody]
	}
	setExpressionAt(_: number, expr: IExpression) {
		this.functionBody = expr
	}

	get isReturn() {
		// Scopes inside of functions may use return statements
		return false
	}

	isStatic() {
		return true
	}

	eval() {
		return 0
	}
}
