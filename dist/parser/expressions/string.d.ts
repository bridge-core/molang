import { Expression } from '../expression';
export declare class StringExpression extends Expression {
    protected name: string;
    type: string;
    constructor(name: string);
    isStatic(): boolean;
    eval(): string;
}
