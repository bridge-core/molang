import { Parser } from '../parse';
import { TToken } from '../../tokenizer/token';
import { IPrefixParselet } from './prefix';
import { ReturnExpression } from '../expressions/return';
export declare class ReturnParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): ReturnExpression;
}
