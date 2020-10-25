import { Expression } from '../expression';
export declare class BooleanExpression extends Expression {
    protected value: boolean;
    type: string;
    constructor(value: boolean);
    isStatic(): boolean;
    eval(): boolean;
}
