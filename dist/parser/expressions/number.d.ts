import { Expression } from '../expression';
export declare class NumberExpression extends Expression {
    protected value: number;
    type: string;
    constructor(value: number);
    get allExpressions(): never[];
    setExpressionAt(): void;
    isStatic(): boolean;
    eval(): number;
    toString(): string;
}
