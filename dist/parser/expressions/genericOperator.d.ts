import { Expression, IExpression } from '../expression';
export declare class GenericOperatorExpression extends Expression {
    protected left: IExpression;
    protected right: IExpression;
    protected operator: string;
    protected evalHelper: (leftExpression: IExpression, rightExpression: IExpression) => unknown;
    type: string;
    constructor(left: IExpression, right: IExpression, operator: string, evalHelper: (leftExpression: IExpression, rightExpression: IExpression) => unknown);
    get allExpressions(): IExpression[];
    setExpressionAt(index: number, expr: IExpression): void;
    isStatic(): boolean;
    eval(): unknown;
    toString(): string;
}
