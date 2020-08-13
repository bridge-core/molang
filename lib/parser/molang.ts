import { IIterator, tokenize } from '../tokenizer/tokenize'
import { Parser } from './parse'
import { BinaryOperator } from './parselets/binaryOperator'
import { EPrecedence } from './precedence'
import { PrefixOperator } from './parselets/prefix'
import { NumberParselet } from './parselets/number'
import { NameParselet } from './parselets/name'
import { GroupParselet } from './parselets/groupParselet'
import { TernaryParselet } from './parselets/ternary'
import { ReturnParselet } from './parselets/Return'
import { PostfixOperatorParselet } from './parselets/postfix'
import { StatementParselet } from './parselets/statement'

export class MoLangParser extends Parser {
	constructor(tokenIterator: IIterator) {
		super(tokenIterator)

		//Special parselets
		this.registerPrefix('NAME', new NameParselet())
		this.registerPrefix('NUMBER', new NumberParselet())
		this.registerPrefix('RETURN', new ReturnParselet())
		this.registerInfix(
			'QUESTION',
			new TernaryParselet(EPrecedence.CONDITIONAL)
		)
		this.registerPrefix(
			'LEFT_PARENT',
			new GroupParselet(EPrecedence.PREFIX)
		)

		//Prefix parselets
		this.registerPrefix('MINUS', new PrefixOperator(EPrecedence.PREFIX))
		this.registerPrefix('BANG', new PrefixOperator(EPrecedence.PREFIX))

		//Postfix parselets
		this.registerInfix(
			'SEMICOLON',
			new StatementParselet(EPrecedence.STATEMENT)
		)

		//Infix parselets
		this.registerInfix('PLUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('MINUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('ASTERISK', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix('SLASH', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix('EQUALS', new BinaryOperator(8))
	}
}
