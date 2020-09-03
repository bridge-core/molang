import { IPrefixParselet } from './prefix';
import { TToken } from '../../tokenizer/token';
import { Parser } from '../parse';
import { NumberExpression } from '../expressions/number';
export declare class NumberParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): NumberExpression;
}
