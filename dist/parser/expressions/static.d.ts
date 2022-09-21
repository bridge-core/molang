import { Expression } from '../expression';
export declare class StaticExpression extends Expression {
    protected value: unknown;
    readonly isReturn: boolean;
    type: string;
    constructor(value: unknown, isReturn?: boolean);
    get allExpressions(): never[];
    setExpressionAt(): void;
    isStatic(): boolean;
    eval(): unknown;
    toString(): string;
}
