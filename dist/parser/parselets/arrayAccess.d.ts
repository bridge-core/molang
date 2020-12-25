import { Token } from '../../tokenizer/token';
import { Parser } from '../parse';
import { IInfixParselet } from './infix';
import { IExpression } from '../expression';
import { ArrayAccessExpression } from '../expressions/arrayAccess';
export declare class ArrayAccessParselet implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, left: IExpression, token: Token): ArrayAccessExpression;
}
