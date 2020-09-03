import { IExpression } from '../expression';
export declare class NameExpression implements IExpression {
    protected name: string;
    protected isFunctionCall: boolean;
    constructor(name: string, isFunctionCall?: boolean);
    isStatic(): boolean;
    setPointer(value: unknown): void;
    setFunctionCall(value?: boolean): void;
    eval(): any;
}
