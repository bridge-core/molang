import { Expression } from '../expression';
import { ExecutionEnvironment } from '../../env';
export declare class NameExpression extends Expression {
    protected env: ExecutionEnvironment;
    protected name: string;
    protected isFunctionCall: boolean;
    type: string;
    constructor(env: ExecutionEnvironment, name: string, isFunctionCall?: boolean);
    isStatic(): boolean;
    setPointer(value: unknown): void;
    setFunctionCall(value?: boolean): void;
    getAsString(): string;
    eval(): any;
}
