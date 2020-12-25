import { Expression, IExpression } from '../expression';
export declare class LoopExpression extends Expression {
    protected count: IExpression;
    protected expression: IExpression;
    type: string;
    constructor(count: IExpression, expression: IExpression);
    get isReturn(): boolean | undefined;
    isStatic(): boolean;
    eval(): unknown;
}
