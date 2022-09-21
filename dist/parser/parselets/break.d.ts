import { Parser } from '../parse';
import { Token } from '../../tokenizer/token';
import { IPrefixParselet } from './prefix';
import { BreakExpression } from '../expressions/break';
export declare class BreakParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: Token): BreakExpression;
}
