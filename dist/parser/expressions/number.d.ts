import { Expression } from '../expression';
export declare class NumberExpression extends Expression {
    protected value: number;
    type: string;
    constructor(value: number);
    isStatic(): boolean;
    eval(): number;
}
