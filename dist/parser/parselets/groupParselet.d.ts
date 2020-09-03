import { IPrefixParselet } from './prefix';
import { TToken } from '../../tokenizer/token';
import { Parser } from '../parse';
export declare class GroupParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): import("../expression").IExpression;
}
