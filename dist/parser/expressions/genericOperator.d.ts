import { IExpression } from '../expression';
export declare class GenericOperatorExpression implements IExpression {
    protected left: IExpression;
    protected right: IExpression;
    protected evalHelper: () => unknown;
    constructor(left: IExpression, right: IExpression, evalHelper: () => unknown);
    isStatic(): boolean;
    eval(): unknown;
}
