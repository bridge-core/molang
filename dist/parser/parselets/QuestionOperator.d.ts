import { Parser } from '../parse';
import { Token } from '../../tokenizer/token';
import { IExpression } from '../expression';
import { GenericOperatorExpression } from '../expressions/genericOperator';
import { IInfixParselet } from './infix';
export declare class QuestionOperator implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, leftExpression: IExpression, token: Token): IExpression | GenericOperatorExpression | import("../expressions").TernaryExpression;
}
