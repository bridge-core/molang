import { Parser } from '../parse';
import { TToken } from '../../tokenizer/token';
import { IPrefixParselet } from './prefix';
import { ContinueExpression } from '../expressions/continue';
export declare class ContinueParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): ContinueExpression;
}
