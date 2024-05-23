import { IInfixParselet } from './infix';
import { Parser } from '../parse';
import { IExpression } from '../expression';
import { Token } from '../../tokenizer/token';
import { GenericOperatorExpression } from '../expressions/genericOperator';
export declare const plusHelper: (leftExpression: IExpression, rightExpression: IExpression) => any;
export declare const minusHelper: (leftExpression: IExpression, rightExpression: IExpression) => number;
export declare const divideHelper: (leftExpression: IExpression, rightExpression: IExpression) => number;
export declare const multiplyHelper: (leftExpression: IExpression, rightExpression: IExpression) => number;
export declare const assignHelper: (leftExpression: IExpression, rightExpression: IExpression) => number;
export declare class BinaryOperator implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, leftExpression: IExpression, token: Token): GenericOperatorExpression;
}
