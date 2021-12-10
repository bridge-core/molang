import { Parser } from './parse'
import { BinaryOperator } from './parselets/binaryOperator'
import { EPrecedence } from './precedence'
import { PrefixOperator } from './parselets/prefix'
import { NumberParselet } from './parselets/number'
import { NameParselet } from './parselets/name'
import { GroupParselet } from './parselets/groupParselet'
import { ReturnParselet } from './parselets/Return'
import { StatementParselet } from './parselets/statement'
import { StringParselet } from './parselets/string'
import { FunctionParselet } from './parselets/function'
import { ArrayAccessParselet } from './parselets/arrayAccess'
import { ScopeParselet } from './parselets/scope'
import { LoopParselet } from './parselets/loop'
import { ForEachParselet } from './parselets/forEach'
import { ContinueParselet } from './parselets/continue'
import { BreakParselet } from './parselets/break'
import { BooleanParselet } from './parselets/boolean'
import { IParserConfig } from '../main'
import { EqualsOperator } from './parselets/equals'
import { NotEqualsOperator } from './parselets/NotEquals'
import { AndOperator } from './parselets/AndOperator'
import { OrOperator } from './parselets/OrOperator'
import { SmallerOperator } from './parselets/SmallerOperator'
import { GreaterOperator } from './parselets/GreaterOperator'
import { QuestionOperator } from './parselets/QuestionOperator'

export class MoLangParser extends Parser {
	constructor(config: Partial<IParserConfig>) {
		super(config)

		//Special parselets
		this.registerPrefix('NAME', new NameParselet())
		this.registerPrefix('STRING', new StringParselet())
		this.registerPrefix('NUMBER', new NumberParselet())
		this.registerPrefix('TRUE', new BooleanParselet(EPrecedence.PREFIX))
		this.registerPrefix('FALSE', new BooleanParselet(EPrecedence.PREFIX))
		this.registerPrefix('RETURN', new ReturnParselet())
		this.registerPrefix('CONTINUE', new ContinueParselet())
		this.registerPrefix('BREAK', new BreakParselet())
		this.registerPrefix('LOOP', new LoopParselet())
		this.registerPrefix('FOR_EACH', new ForEachParselet())
		this.registerInfix(
			'QUESTION',
			new QuestionOperator(EPrecedence.CONDITIONAL)
		)
		this.registerPrefix('LEFT_PARENT', new GroupParselet())
		this.registerInfix(
			'LEFT_PARENT',
			new FunctionParselet(EPrecedence.FUNCTION)
		)
		this.registerInfix(
			'ARRAY_LEFT',
			new ArrayAccessParselet(EPrecedence.ARRAY_ACCESS)
		)
		this.registerPrefix('CURLY_LEFT', new ScopeParselet(EPrecedence.SCOPE))
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
		this.registerInfix('PLUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('MINUS', new BinaryOperator(EPrecedence.SUM))
		this.registerInfix('ASTERISK', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix('SLASH', new BinaryOperator(EPrecedence.PRODUCT))
		this.registerInfix(
			'EQUALS',
			new EqualsOperator(EPrecedence.EQUALS_COMPARE)
		)
		this.registerInfix(
			'BANG',
			new NotEqualsOperator(EPrecedence.EQUALS_COMPARE)
		)
		this.registerInfix('GREATER', new GreaterOperator(EPrecedence.COMPARE))
		this.registerInfix('SMALLER', new SmallerOperator(EPrecedence.COMPARE))
		this.registerInfix('AND', new AndOperator(EPrecedence.AND))
		this.registerInfix('OR', new OrOperator(EPrecedence.OR))
		this.registerInfix('ASSIGN', new BinaryOperator(EPrecedence.ASSIGNMENT))
	}
}
