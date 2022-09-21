import { Expression, IExpression } from '../expression';
export declare class ForEachExpression extends Expression {
    protected variable: IExpression;
    protected arrayExpression: IExpression;
    protected expression: IExpression;
    type: string;
    constructor(variable: IExpression, arrayExpression: IExpression, expression: IExpression);
    get isReturn(): boolean | undefined;
    get allExpressions(): IExpression[];
    setExpressionAt(index: number, expr: IExpression): void;
    isStatic(): boolean;
    eval(): unknown;
    toString(): string;
}
