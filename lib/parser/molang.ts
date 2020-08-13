import { IIterator } from '../tokenizer/tokenize'
import { Parser } from './parse'
import { BinaryOperator } from './parselets/binaryOperator'
import { EPrecedence } from './precedence'
import { PrefixOperator } from './parselets/prefix'
import { NumberParselet } from './parselets/number'
import { NameParselet } from './parselets/name'
import { GroupParselet } from './parselets/groupParselet'
import { TernaryParselet } from './parselets/ternary'
import { ReturnParselet } from './parselets/Return'
import { StatementParselet } from './parselets/statement'
import { StringParselet } from './parselets/string'
import { FunctionParselet } from './parselets/function'

export class MoLangParser extends Parser {
	constructor(tokenIterator: IIterator, useOptimizer = true) {
		super(tokenIterator, useOptimizer)

		//Special parselets
		this.registerPrefix('NAME', new NameParselet())
		this.registerPrefix('STRING', new StringParselet())
		this.registerPrefix('NUMBER', new NumberParselet())
		this.registerPrefix('RETURN', new ReturnParselet())
		this.registerInfix(
			'QUESTION',
			new TernaryParselet(EPrecedence.CONDITIONAL)
		)
		this.registerPrefix('LEFT_PARENT', new GroupParselet())
		this.registerInfix(
			'LEFT_PARENT',
			new FunctionParselet(EPrecedence.FUNCTION)
		)
		this.registerInfix(
			'SEMICOLON',
			new StatementParselet(EPrecedence.STATEMENT)
		)

		//Prefix parselets
		this.registerPrefix('MINUS', new PrefixOperator(EPrecedence.PREFIX))
		this.registerPrefix('BANG', new PrefixOperator(EPrecedence.PREFIX))

		//Postfix parselets
		//Nothing here yet

		//Infix parselets
		this.registerInfix(
			'PERIOD',
			new BinaryOperator(EPrecedence.PROPERTY_ACCESS)
		)
		this.registerInfix('PLUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('MINUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('ASTERISK', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix('SLASH', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix('EQUALS', new BinaryOperator(EPrecedence.COMPARE))
		this.registerInfix(
			'NOT_EQUALS',
			new BinaryOperator(EPrecedence.COMPARE)
		)
		this.registerInfix(
			'GREATER_OR_EQUALS',
			new BinaryOperator(EPrecedence.COMPARE)
		)
		this.registerInfix('GREATER', new BinaryOperator(EPrecedence.COMPARE))
		this.registerInfix(
			'SMALLER_OR_EQUALS',
			new BinaryOperator(EPrecedence.COMPARE)
		)
		this.registerInfix('SMALLER', new BinaryOperator(EPrecedence.COMPARE))
		this.registerInfix('AND', new BinaryOperator(EPrecedence.AND))
		this.registerInfix('OR', new BinaryOperator(EPrecedence.OR))
		this.registerInfix(
			'NULLISH_COALESCING',
			new BinaryOperator(EPrecedence.NULLISH_COALESCING)
		)
	}
}
