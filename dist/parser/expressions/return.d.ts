import { Expression, IExpression } from '../expression';
export declare class ReturnExpression extends Expression {
    protected expression: IExpression;
    type: string;
    isReturn: boolean;
    constructor(expression: IExpression);
    get allExpressions(): IExpression[];
    setExpressionAt(_: number, expr: IExpression): void;
    isStatic(): boolean;
    eval(): unknown;
    toString(): string;
}
