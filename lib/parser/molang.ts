import { IIterator, tokenize } from '../tokenizer/tokenize'
import { Parser } from './parse'
import { BinaryOperator } from './parselets/binaryOperator'
import { EPrecedence } from './precedence'
import { PrefixOperator } from './parselets/prefix'
import { NumberParselet } from './parselets/number'
import { NameParselet } from './parselets/name'

export class MoLangParser extends Parser {
	constructor(tokenIterator: IIterator) {
		super(tokenIterator)

		this.registerPrefix('NAME', new NameParselet(EPrecedence.PREFIX))
		this.registerPrefix('NUMBER', new NumberParselet(EPrecedence.PREFIX))
		this.registerPrefix('MINUS', new PrefixOperator(EPrecedence.PREFIX))

		this.registerInfix('PLUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('MINUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('ASTERISK', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix('SLASH', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix('EQUALS', new BinaryOperator(8))
	}
}
