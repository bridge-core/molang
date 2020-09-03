import { Parser } from '../parse';
import { TToken } from '../../tokenizer/token';
import { IPrefixParselet } from './prefix';
import { LoopExpression } from '../expressions/loop';
export declare class LoopParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): LoopExpression;
}
