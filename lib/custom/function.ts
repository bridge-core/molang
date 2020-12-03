import { Parser } from '../parser/parse'
import { TToken } from '../parser/../tokenizer/token'
import { IPrefixParselet } from '../parser/parselets/prefix'
import { Expression, IExpression } from '../parser/expression'
import { ExecutionEnvironment } from '../env'
import { StringExpression } from '../parser/expressions/string'
import { StatementExpression } from '../parser/expressions/statement'

export class CustomFunctionParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		parser.consume('LEFT_PARENT')
		if (parser.match('RIGHT_PARENT'))
			throw new Error(`function() called without arguments`)

		let args: string[] = []
		let functionBody: IExpression | undefined
		let functionName: string | undefined
		do {
			const expr = parser.parseExpression()
			if (expr instanceof StringExpression) {
				if (!functionName) functionName = expr.eval()
				else args.push(expr.eval())
			} else if (expr instanceof StatementExpression) {
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
			parser.executionEnv,
			functionName,
			args,
			functionBody
		)
	}
}

class CustomFunctionExpression extends Expression {
	type = 'CustomFunctionExpression'
	constructor(
		protected env: ExecutionEnvironment,
		protected functionName: string,
		protected args: string[],
		protected functionBody: IExpression
	) {
		super()
	}

	get isReturn() {
		// Scopes inside of functions may use return statements
		return false
	}

	isStatic() {
		return this.functionBody.isStatic()
	}

	eval() {
		this.env.setAt(
			`function.${this.functionName}`,
			(...args: unknown[]) => {
				//Handle arguments
				if (args.length !== this.args.length)
					throw new Error(
						`Argument count mismatch for "function.${this.functionName}": Expected ${this.args.length} arguments; received ${args.length}`
					)

				let i = 0
				while (i < this.args.length) {
					this.env.setAt(`arg.${this.args[i]}`, args[i])
					i++
				}

				const result = this.functionBody.eval()

				//Cleanup env
				i = 0
				while (i < this.args.length) {
					this.env.setAt(`arg.${this.args[i]}`, undefined)
					i++
				}

				return result
			}
		)

		return 0
	}
}
