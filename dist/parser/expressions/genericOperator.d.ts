import { Expression, IExpression } from '../expression';
export declare class GenericOperatorExpression extends Expression {
    protected left: IExpression;
    protected right: IExpression;
    protected evalHelper: () => unknown;
    type: string;
    constructor(left: IExpression, right: IExpression, evalHelper: () => unknown);
    isStatic(): boolean;
    eval(): unknown;
}
