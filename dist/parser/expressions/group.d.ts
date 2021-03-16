import { Expression, IExpression } from '../expression';
export declare class GroupExpression extends Expression {
    protected expression: IExpression;
    protected brackets: string;
    type: string;
    constructor(expression: IExpression, brackets: string);
    get allExpressions(): IExpression[];
    setExpressionAt(_: number, expr: IExpression): void;
    isStatic(): boolean;
    get isReturn(): boolean | undefined;
    eval(): unknown;
    toString(): string;
}
