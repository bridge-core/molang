import { Parser } from '../parse';
import { IExpression } from '../expression';
import { TToken } from '../../tokenizer/token';
import { PrefixExpression } from '../expressions/prefix';
export interface IPrefixParselet {
    readonly precedence: number;
    parse: (parser: Parser, token: TToken) => IExpression;
}
export declare class PrefixOperator implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): PrefixExpression;
}
