import { IPrefixParselet } from './prefix';
import { Token } from '../../tokenizer/token';
import { Parser } from '../parse';
import { StringExpression } from '../expressions/string';
export declare class StringParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: Token): StringExpression;
}
