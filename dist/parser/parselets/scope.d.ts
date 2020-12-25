import { Parser } from '../parse';
import { Token } from '../../tokenizer/token';
import { IPrefixParselet } from './prefix';
import { StatementExpression } from '../expressions/statement';
export declare class ScopeParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: Token): StatementExpression;
}
