import { ExecutionEnvironment } from './env/env'
import { IExpression, IParserConfig } from './main'
import { NameExpression } from './parser/expressions'
import { GenericOperatorExpression } from './parser/expressions/genericOperator'
import { StaticExpression } from './parser/expressions/static'
import { StringExpression } from './parser/expressions/string'
import { MolangParser } from './parser/molang'

export class Molang {
	protected expressionCache: Record<string, IExpression> = {}
	protected totalCacheEntries = 0
	protected executionEnvironment!: ExecutionEnvironment

	protected parser: MolangParser

	constructor(
		env: Record<string, unknown> = {},
		protected config: Partial<IParserConfig> = {}
	) {
		if (config.useOptimizer === undefined) this.config.useOptimizer = true
		if (config.useCache === undefined) this.config.useCache = true
		if (config.earlyReturnsSkipParsing === undefined)
			this.config.earlyReturnsSkipParsing = true
		if (config.earlyReturnsSkipTokenization === undefined)
			this.config.earlyReturnsSkipTokenization = true
		if (config.convertUndefined === undefined)
			this.config.convertUndefined = false

		this.parser = new MolangParser({
			...this.config,
			tokenizer: undefined,
		})

		this.updateExecutionEnv(env, config.assumeFlatEnvironment)
	}

	updateConfig(newConfig: Partial<IParserConfig>) {
		newConfig = Object.assign(this.config, newConfig)

		if (newConfig.tokenizer) this.parser.setTokenizer(newConfig.tokenizer)
		this.parser.updateConfig({ ...this.config, tokenizer: undefined })
		this.executionEnvironment.updateConfig(newConfig)
	}
	updateExecutionEnv(env: Record<string, unknown>, isFlat = false) {
		this.executionEnvironment = new ExecutionEnvironment(env, {
			useRadians: this.config.useRadians,
			convertUndefined: this.config.convertUndefined,
			isFlat,
			variableHandler: this.config.variableHandler,
		})
		this.parser.setExecutionEnvironment(this.executionEnvironment)
	}
	/**
	 * Clears the Molang expression cache
	 */
	clearCache() {
		this.expressionCache = {}
		this.totalCacheEntries = 0
	}

	/**
	 * Execute the given Molang string `expression`
	 * @param expression The Molang string to execute
	 *
	 * @returns The value the Molang expression corresponds to
	 */
	execute(expression: string) {
		// this.parser.setExecutionEnvironment(this.executionEnvironment)
		const abstractSyntaxTree = this.parse(expression)

		const result = abstractSyntaxTree.eval()
		if (result === undefined) return 0
		if (typeof result === 'boolean') return Number(result)
		return result
	}
	/**
	 * Execute the given Molang string `expression`
	 * In case of errors, return 0
	 * @param expression The Molang string to execute
	 *
	 * @returns The value the Molang expression corresponds to and 0 if the statement is invalid
	 */
	executeAndCatch(expression: string) {
		try {
			return this.execute(expression)
		} catch {
			return 0
		}
	}

	/**
	 * Parse the given Molang string `expression`
	 * @param expression The Molang string to parse
	 *
	 * @returns An AST that corresponds to the Molang expression
	 */
	parse(expression: string): IExpression {
		if (this.config.useCache ?? true) {
			const abstractSyntaxTree = this.expressionCache[expression]
			if (abstractSyntaxTree) return abstractSyntaxTree
		}

		this.parser.init(expression)
		let abstractSyntaxTree = this.parser.parseExpression()
		if ((this.config.useOptimizer ?? true) && abstractSyntaxTree.isStatic())
			abstractSyntaxTree = new StaticExpression(abstractSyntaxTree.eval())
		// console.log(JSON.stringify(abstractSyntaxTree, null, '  '))

		if (this.config.useCache ?? true) {
			if (this.totalCacheEntries > (this.config.maxCacheSize || 256))
				this.clearCache()

			this.expressionCache[expression] = abstractSyntaxTree
			this.totalCacheEntries++
		}

		return abstractSyntaxTree
	}

	resolveStatic(ast: IExpression) {
		// 0. TODO: Rearrange statements so all static expressions can be resolved

		// 1. Resolve all static expressions
		ast = ast.walk((expr) => {
			if (expr instanceof StringExpression) return

			if (expr.isStatic()) return new StaticExpression(expr.eval())
		})

		// 2. Remove unnecessary operations
		ast = ast.walk((expr) => {
			if (expr instanceof GenericOperatorExpression) {
				switch (expr.operator) {
					case '+':
					case '-': {
						// If one of the two operands is 0,
						// we can simplify the expression to only return the other operand
						const zeroEquivalentOperand = expr.allExpressions.find(
							(expr) => expr.isStatic() && expr.eval() === 0
						)
						if (zeroEquivalentOperand) {
							return expr.allExpressions.find(
								(expr) => expr !== zeroEquivalentOperand
							)
						}

						break
					}
					case '*': {
						// If one of the two operands is 0,
						// we can simplify the expression to 0
						const zeroEquivalentOperand = expr.allExpressions.find(
							(expr) => expr.isStatic() && expr.eval() === 0
						)
						if (zeroEquivalentOperand) {
							return new StaticExpression(0)
						}
					}
					case '*':
					case '/': {
						// If one of the two operands is 1,
						// we can simplify the expression to only return the other operand
						const oneEquivalentOperand = expr.allExpressions.find(
							(expr) => expr.isStatic() && expr.eval() === 1
						)
						if (oneEquivalentOperand) {
							return expr.allExpressions.find(
								(expr) => expr !== oneEquivalentOperand
							)
						}

						break
					}
				}
			}
		})

		return ast
	}

	minimize(ast: IExpression) {
		// 1. Resolve all static expressions
		ast = this.resolveStatic(ast)

		// 2. Rename accessors to short hand
		const replaceMap = new Map([
			['query.', 'q.'],
			['variable.', 'v.'],
			['context.', 'c.'],
			['temp.', 't.'],
		])
		ast = ast.walk((expr) => {
			if (expr instanceof NameExpression) {
				const name = expr.toString()

				for (const [key, replaceWith] of replaceMap) {
					if (name.startsWith(key)) {
						expr.setName(name.replace(key, replaceWith))
					}
				}

				return expr
			}
		})

		// 3. Rename variables
		const variableMap = new Map()
		ast = ast.walk((expr) => {
			if (expr instanceof NameExpression) {
				const name = expr.toString()

				if (!name.startsWith('v.') && !name.startsWith('t.')) return

				if (variableMap.has(name)) {
					expr.setName(variableMap.get(name))
				} else {
					// Get unique name
					const newName = `v.v${variableMap.size}`
					variableMap.set(name, newName)
					expr.setName(newName)
				}

				return expr
			}
		})

		return ast
	}

	getParser() {
		return this.parser
	}
}
