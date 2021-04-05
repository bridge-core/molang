import { Parser } from '../../parser/parse';
import { Token } from '../../tokenizer/token';
import { IExpression } from '../expression';
import { GenericOperatorExpression } from '../expressions/genericOperator';
import { IInfixParselet } from './infix';
export declare class EqualsOperator implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, leftExpression: IExpression, token: Token): GenericOperatorExpression;
}
