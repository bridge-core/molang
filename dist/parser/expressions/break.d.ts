import { Expression } from '../expression';
export declare class BreakExpression extends Expression {
    type: string;
    isBreak: boolean;
    constructor();
    isStatic(): boolean;
    eval(): number;
}
