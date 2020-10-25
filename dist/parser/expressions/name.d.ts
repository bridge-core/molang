import { Expression } from '../expression';
export declare class NameExpression extends Expression {
    protected name: string;
    protected isFunctionCall: boolean;
    type: string;
    constructor(name: string, isFunctionCall?: boolean);
    isStatic(): boolean;
    setPointer(value: unknown): void;
    setFunctionCall(value?: boolean): void;
    eval(): any;
}
