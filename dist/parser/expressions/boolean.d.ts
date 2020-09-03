import { IExpression } from '../expression';
export declare class BooleanExpression implements IExpression {
    protected value: boolean;
    constructor(value: boolean);
    isStatic(): boolean;
    eval(): boolean;
}
