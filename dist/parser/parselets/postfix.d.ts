import { Parser } from '../parse';
import { IExpression } from '../expression';
import { Token } from '../../tokenizer/token';
import { IInfixParselet } from './infix';
import { PostfixExpression } from '../expressions/postfix';
export declare class PostfixOperatorParselet implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, left: IExpression, token: Token): PostfixExpression;
}
