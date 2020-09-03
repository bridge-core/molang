import { IExpression } from '../expression';
export declare class NumberExpression implements IExpression {
    protected value: number;
    constructor(value: number);
    isStatic(): boolean;
    eval(): number;
}
