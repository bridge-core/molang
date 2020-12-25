import { Expression, IExpression } from '../expression';
export declare class TernaryExpression extends Expression {
    protected leftExpression: IExpression;
    protected thenExpression: IExpression;
    protected elseExpression: IExpression;
    type: string;
    protected leftResult: unknown;
    constructor(leftExpression: IExpression, thenExpression: IExpression, elseExpression: IExpression);
    get isReturn(): boolean | undefined;
    get isContinue(): boolean | undefined;
    get isBreak(): boolean | undefined;
    isStatic(): boolean;
    eval(): unknown;
}
