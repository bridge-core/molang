import { Expression } from '../expression';
export declare class ContinueExpression extends Expression {
    type: string;
    isContinue: boolean;
    constructor();
    isStatic(): boolean;
    eval(): number;
}
