import { IExpression } from '../expression';
export declare class ForEachExpression implements IExpression {
    protected variable: IExpression;
    protected arrayExpression: IExpression;
    protected expression: IExpression;
    constructor(variable: IExpression, arrayExpression: IExpression, expression: IExpression);
    get isReturn(): boolean | undefined;
    isStatic(): boolean;
    eval(): unknown;
}
