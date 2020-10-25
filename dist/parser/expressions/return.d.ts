import { Expression, IExpression } from '../expression';
export declare class ReturnExpression extends Expression {
    protected expression: IExpression;
    type: string;
    isReturn: boolean;
    constructor(expression: IExpression);
    isStatic(): boolean;
    eval(): unknown;
}
