import { IExpression } from '../expression';
export declare class StringExpression implements IExpression {
    protected name: string;
    constructor(name: string);
    isStatic(): boolean;
    eval(): string;
}
