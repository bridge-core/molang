import { IPrefixParselet } from './prefix';
import { TToken } from '../../tokenizer/token';
import { Parser } from '../parse';
import { NameExpression } from '../expressions/name';
export declare class NameParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): NameExpression;
}
