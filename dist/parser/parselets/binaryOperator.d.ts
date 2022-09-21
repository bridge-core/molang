import { IInfixParselet } from './infix';
import { Parser } from '../parse';
import { IExpression } from '../expression';
import { Token } from '../../tokenizer/token';
import { GenericOperatorExpression } from '../expressions/genericOperator';
export declare class BinaryOperator implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, leftExpression: IExpression, token: Token): GenericOperatorExpression;
}
