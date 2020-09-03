import { IExpression } from '../expression';
export declare class ReturnExpression {
    protected expression: IExpression;
    isReturn: boolean;
    constructor(expression: IExpression);
    isStatic(): boolean;
    eval(): unknown;
}
