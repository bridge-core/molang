import { IExpression } from '../expression';
export declare class ArrayAccessExpression implements IExpression {
    protected name: IExpression;
    protected lookup: IExpression;
    constructor(name: IExpression, lookup: IExpression);
    isStatic(): boolean;
    setPointer(value: unknown): void;
    eval(): any;
}
