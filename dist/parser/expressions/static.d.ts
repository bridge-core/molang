import { Expression } from '../expression';
export declare class StaticExpression extends Expression {
    protected value: unknown;
    readonly isReturn: boolean;
    type: string;
    constructor(value: unknown, isReturn?: boolean);
    isStatic(): boolean;
    eval(): unknown;
}
