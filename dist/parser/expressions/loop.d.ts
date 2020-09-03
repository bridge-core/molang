import { IExpression } from '../expression';
export declare class LoopExpression implements IExpression {
    protected count: IExpression;
    protected expression: IExpression;
    constructor(count: IExpression, expression: IExpression);
    get isReturn(): boolean | undefined;
    isStatic(): boolean;
    eval(): unknown;
}
