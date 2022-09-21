import { Expression } from '../expression';
export declare class ContinueExpression extends Expression {
    type: string;
    isContinue: boolean;
    constructor();
    get allExpressions(): never[];
    setExpressionAt(): void;
    isStatic(): boolean;
    eval(): number;
    toString(): string;
}
