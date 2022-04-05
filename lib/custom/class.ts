import { Parser } from '../parser/parse'
import { Token } from '../tokenizer/token'
import { IPrefixParselet } from '../parser/parselets/prefix'
import { Expression, IExpression } from '../parser/expression'
import { StringExpression } from '../parser/expressions/string'
import { StatementExpression } from '../parser/expressions/statement'
import { CustomMoLangParser } from './main'
import { GroupExpression } from '../parser/expressions/group'

export class CustomClassParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		parser.consume('LEFT_PARENT')
		if (parser.match('RIGHT_PARENT'))
			throw new Error(`function() called without arguments`)

		let args: string[] = []
		let classBody: IExpression | undefined
		let className: string | undefined
		do {
			const expr = parser.parseExpression()
			if (expr instanceof StringExpression) {
				if (!className) className = <string>expr.eval()
				else args.push(<string>expr.eval())
			} else if (
				expr instanceof StatementExpression ||
				expr instanceof GroupExpression
			) {
				classBody = expr
			} else {
				throw new Error(
					`Unexpected expresion: found "${expr.constructor.name}"`
				)
			}
		} while (parser.match('COMMA'))
		parser.consume('RIGHT_PARENT')

		if (!className)
			throw new Error(
				`Missing class() name (argument 1); found "${className}"`
			)
		if (!classBody)
			throw new Error(
				`Missing class() body (argument ${args.length + 2})`
			)
		// Make sure that the function declaration is terminated with a semicolon
		if (parser.lookAhead(0).getType() !== 'SEMICOLON')
			throw new Error(`Missing semicolon after class expression`)

		return new CustomClassExpression(
			(<CustomMoLangParser>parser).functions,
			className,
			args,
			classBody
		)
	}
}

class CustomClassExpression extends Expression {
	type = 'CustomClassExpression'
	constructor(
		functions: Map<string, [string[], string]>,
		functionName: string,
		args: string[],
		protected functionBody: IExpression
	) {
		super()
		functions.set(functionName.toLowerCase(), [
			args,
			functionBody instanceof GroupExpression
				? functionBody.allExpressions[0].toString()
				: functionBody.toString(),
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
