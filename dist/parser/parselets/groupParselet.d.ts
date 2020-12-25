import { IPrefixParselet } from './prefix';
import { Token } from '../../tokenizer/token';
import { Parser } from '../parse';
export declare class GroupParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: Token): import("../expression").IExpression;
}
