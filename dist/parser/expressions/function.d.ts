import { IExpression } from '../expression';
export declare class FunctionExpression implements IExpression {
    protected name: IExpression;
    protected args: IExpression[];
    constructor(name: IExpression, args: IExpression[]);
    isStatic(): boolean;
    eval(): unknown;
}
