import { Expression } from '../expression';
export declare class BreakExpression extends Expression {
    type: string;
    isBreak: boolean;
    constructor();
    get allExpressions(): never[];
    setExpressionAt(): void;
    isStatic(): boolean;
    eval(): number;
    isString(): string;
}
