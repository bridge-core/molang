import { IExpression } from '../expression';
export declare class StaticExpression implements IExpression {
    protected value: unknown;
    readonly isReturn: boolean;
    constructor(value: unknown, isReturn?: boolean);
    isStatic(): boolean;
    eval(): unknown;
}
