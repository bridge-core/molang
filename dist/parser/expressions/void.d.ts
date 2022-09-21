import { Expression } from '../expression';
export declare class VoidExpression extends Expression {
    type: string;
    get allExpressions(): never[];
    setExpressionAt(): void;
    isStatic(): boolean;
    eval(): number;
    toString(): string;
}
