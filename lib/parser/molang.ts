import { IIterator, tokenize } from '../tokenizer/tokenize'
import { Parser } from './parse'
import { BinaryOperator } from './parselets/binaryOperator'
import { EPrecedence } from './precedence'
import { NameParselet } from './parselets/name'

export class MoLangParser extends Parser {
	constructor(tokenIterator: IIterator) {
		super(tokenIterator)

		this.registerPrefix('NUMBER', new NameParselet(EPrecedence.PREFIX))
		this.registerInfix('PLUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('ASTERISK', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix('EQUALS', new BinaryOperator(8))
	}
}
