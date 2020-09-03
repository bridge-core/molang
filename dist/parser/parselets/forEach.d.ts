import { Parser } from '../parse';
import { TToken } from '../../tokenizer/token';
import { IPrefixParselet } from './prefix';
import { ForEachExpression } from '../expressions/forEach';
export declare class ForEachParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): ForEachExpression;
}
