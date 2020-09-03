import { IInfixParselet } from './infix';
import { Parser } from '../parse';
import { IExpression } from '../expression';
import { TToken } from '../../tokenizer/token';
import { TernaryExpression } from '../expressions/ternary';
export declare class TernaryParselet implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, leftExpression: IExpression, token: TToken): TernaryExpression;
}
