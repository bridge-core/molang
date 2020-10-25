import { Expression, IExpression } from '../expression';
export declare class FunctionExpression extends Expression {
    protected name: IExpression;
    protected args: IExpression[];
    type: string;
    constructor(name: IExpression, args: IExpression[]);
    isStatic(): boolean;
    eval(): unknown;
}
