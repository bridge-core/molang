import { Expression } from '../expression';
export declare class FunctionExpression extends Expression {
    protected name: Expression;
    protected args: Expression[];
    type: string;
    constructor(name: Expression, args: Expression[]);
    isStatic(): boolean;
    eval(): unknown;
}
