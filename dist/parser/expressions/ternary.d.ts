import { IExpression } from '../expression';
export declare class TernaryExpression implements IExpression {
    protected leftExpression: IExpression;
    protected thenExpression: IExpression;
    protected elseExpression: IExpression;
    protected leftResult: unknown;
    constructor(leftExpression: IExpression, thenExpression: IExpression, elseExpression: IExpression);
    get isReturn(): boolean | undefined;
    get isContinue(): boolean | undefined;
    get isBreak(): boolean | undefined;
    isStatic(): boolean;
    eval(): unknown;
}
