import { TToken } from '../../tokenizer/token';
import { Parser } from '../parse';
import { IInfixParselet } from './infix';
import { IExpression } from '../expression';
import { FunctionExpression } from '../expressions/function';
export declare class FunctionParselet implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, left: IExpression, token: TToken): FunctionExpression;
}
