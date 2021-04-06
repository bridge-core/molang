import { Expression } from '../expression';
import { Parser } from '../parse';
export declare class NameExpression extends Expression {
    protected parser: Parser;
    protected name: string;
    protected isFunctionCall: boolean;
    type: string;
    constructor(parser: Parser, name: string, isFunctionCall?: boolean);
    get allExpressions(): never[];
    setExpressionAt(): void;
    isStatic(): boolean;
    setPointer(value: unknown): void;
    setFunctionCall(value?: boolean): void;
    setName(name: string): void;
    eval(): any;
    toString(): string;
}
