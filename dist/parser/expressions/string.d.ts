import { Expression } from '../expression';
export declare class StringExpression extends Expression {
    protected name: string;
    type: string;
    constructor(name: string);
    get allExpressions(): never[];
    setExpressionAt(): void;
    isStatic(): boolean;
    eval(): string;
    toString(): string;
}
