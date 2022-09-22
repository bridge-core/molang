import { ExecutionEnvironment } from './env/env'
import { IExpression, IParserConfig } from './main'
import { NameExpression, PrefixExpression } from './parser/expressions'
import { GenericOperatorExpression } from './parser/expressions/genericOperator'
import { plusHelper, minusHelper, multiplyHelper, divideHelper } from './parser/parselets/binaryOperator'
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
		this.parser.setExecutionEnvironment(this.executionEnvironment)
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

	rearrangeOptimally(ast: IExpression): IExpression {

		let lastAst
		do {
			lastAst = ast.toString()
			ast = ast.walk((expr) => {
				if (expr instanceof GenericOperatorExpression) {

					let leftExpr = expr.allExpressions[0]
					let rightExpr = expr.allExpressions[1]

					if (leftExpr instanceof GenericOperatorExpression && rightExpr.isStatic()) {

						let rightSubExpr = leftExpr.allExpressions[1]
						let leftSubExpr = leftExpr.allExpressions[0]

						//If leftmost is nonstatic and right is, swap
						if (!leftSubExpr.isStatic() && !(leftSubExpr instanceof GenericOperatorExpression) && rightSubExpr.isStatic()) {
							let temp = leftSubExpr
							leftSubExpr = rightSubExpr
							rightSubExpr = temp
						}

						if (!rightSubExpr.isStatic()) {

							//Both are additions
							if (expr.operator === '+' && leftExpr.operator === '+') {
								const newSubExpr = new GenericOperatorExpression(leftSubExpr, rightExpr, '+', plusHelper);
								return new GenericOperatorExpression(newSubExpr, rightSubExpr, '+', plusHelper)
							}

							//Both are subtractions
							if (expr.operator === '-' && leftExpr.operator === '-') {
								const newSubExpr = new GenericOperatorExpression(leftSubExpr, rightExpr, '-', minusHelper);
								return new GenericOperatorExpression(newSubExpr, rightSubExpr, '-', minusHelper)
							}

							//Both are multiplications
							if (expr.operator === '*' && leftExpr.operator === '*') {
								const newSubExpr = new GenericOperatorExpression(leftSubExpr, rightExpr, '*', multiplyHelper);
								return new GenericOperatorExpression(newSubExpr, rightSubExpr, '*', multiplyHelper)
							}

							//One is a division, other is a multiplication
							if (expr.operator === '/' && leftExpr.operator === '*' || expr.operator === '*' && leftExpr.operator === '/') {
								const newSubExpr = new GenericOperatorExpression(leftSubExpr, rightExpr, '/', divideHelper);
								return new GenericOperatorExpression(newSubExpr, rightSubExpr, '*', multiplyHelper)
							}

							//Two divisions
							if (expr.operator === '/' && leftExpr.operator === '/') {
								const newSubExpr = new GenericOperatorExpression(leftSubExpr, rightExpr, '*', multiplyHelper);
								return new GenericOperatorExpression(rightSubExpr, newSubExpr, '/', divideHelper)
							}

							//First is a subtraction, other is an addition
							if (expr.operator === '-' && leftExpr.operator === '+') {
								const newSubExpr = new GenericOperatorExpression(leftSubExpr, rightExpr, '-', minusHelper);
								return new GenericOperatorExpression(newSubExpr, rightSubExpr, '+', plusHelper)
							}

							//First is an addition, other is an subtraction
							if (expr.operator === '+' && leftExpr.operator === '-') {
								const newSubExpr = new GenericOperatorExpression(leftSubExpr, rightExpr, '+', plusHelper);
								return new GenericOperatorExpression(newSubExpr, rightSubExpr, '-', minusHelper)
							}
						}
					}
				}
			})
		} while (ast.toString() !== lastAst)

		return ast;
	}


	resolveStatic(ast: IExpression) {
		// 0. Rearrange statements so all static expressions can be resolved
		ast = this.rearrangeOptimally(ast)

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
						//We check if the first operand is the zero equivalent operand
						const firstOperand = expr.allExpressions[0] === zeroEquivalentOperand
						if (zeroEquivalentOperand) {
							const otherOperand = expr.allExpressions.find(
								(expr) => expr !== zeroEquivalentOperand
							)
							//If have subtraction and the first operand is the zero equivalent operand, we need to negate the other operand
							if (expr.operator === '-' && firstOperand && otherOperand) {
								return new PrefixExpression('MINUS', otherOperand)
							}
							//Fallback to only returning the other operand
							return otherOperand
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

						// If one of the two operands is 1,
						// we can simplify the expression to only return the other operand
						const oneEquivalentOperand = expr.allExpressions.find(
							(expr) => expr.isStatic() && expr.eval() === 1
						)
						if (oneEquivalentOperand) {
							const otherOperand = expr.allExpressions.find(
								(expr) => expr !== oneEquivalentOperand
							)
							return otherOperand
						}
					}
					case '/': {

						const leftOperand = expr.allExpressions[0]
						const rightOperand = expr.allExpressions[1]
						// If the right operand is 1, we can simplify the expression to only return the left operand
						if (rightOperand.isStatic() && rightOperand.eval() === 1) {
							return leftOperand
						}

						// If the left operand is 0, we can simplify the expression to 0
						if (leftOperand.isStatic() && leftOperand.eval() === 0) {
							return new StaticExpression(0)
						}

						break
					}
				}

				//Limited common subexpression elimination
				switch (expr.operator) {
					case '+': {
						const leftOperand = expr.allExpressions[0]
						const rightOperand = expr.allExpressions[1]
						if (leftOperand.toString() === rightOperand.toString()) {
							return new GenericOperatorExpression(new StaticExpression(2), leftOperand, '*', multiplyHelper)
						}
						break
					}
					case '-':{
						const leftOperand = expr.allExpressions[0]
						const rightOperand = expr.allExpressions[1]
						if (leftOperand.toString() === rightOperand.toString()) {
							return new StaticExpression(0)
						}
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
				// Don't minify vars like "v.x" or "t.x"
				if (name.length === 3) return

				const varPrefix = name.startsWith('v.') ? 'v.' : 't.'

				if (variableMap.has(name)) {
					expr.setName(variableMap.get(name))
				} else {
					// Get unique name
					const newName = `${varPrefix}v${variableMap.size}`
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
