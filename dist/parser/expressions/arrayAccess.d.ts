import { Expression, IExpression } from '../expression';
export declare class ArrayAccessExpression extends Expression {
    protected name: IExpression;
    protected lookup: IExpression;
    type: string;
    constructor(name: IExpression, lookup: IExpression);
    get allExpressions(): IExpression[];
    setExpressionAt(index: number, expr: IExpression): void;
    isStatic(): boolean;
    setPointer(value: unknown): void;
    eval(): any;
    toString(): string;
}
