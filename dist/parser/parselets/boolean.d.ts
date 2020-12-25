import { IPrefixParselet } from './prefix';
import { Token } from '../../tokenizer/token';
import { Parser } from '../parse';
import { BooleanExpression } from '../expressions/boolean';
export declare class BooleanParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: Token): BooleanExpression;
}
