import { Expression, IExpression } from '../expression';
export declare class ArrayAccessExpression extends Expression {
    protected name: IExpression;
    protected lookup: IExpression;
    type: string;
    constructor(name: IExpression, lookup: IExpression);
    isStatic(): boolean;
    setPointer(value: unknown): void;
    eval(): any;
}
