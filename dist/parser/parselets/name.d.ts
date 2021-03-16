import { IPrefixParselet } from './prefix';
import { Token } from '../../tokenizer/token';
import { Parser } from '../parse';
import { NameExpression } from '../expressions/name';
import { StaticExpression } from '../expressions/static';
export declare class NameParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: Token): StaticExpression | NameExpression;
}
