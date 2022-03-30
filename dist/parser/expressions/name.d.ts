import { ExecutionEnvironment } from '../../env/env';
import { Expression } from '../expression';
export declare class NameExpression extends Expression {
    executionEnv: ExecutionEnvironment;
    protected name: string;
    protected isFunctionCall: boolean;
    type: string;
    constructor(executionEnv: ExecutionEnvironment, name: string, isFunctionCall?: boolean);
    get allExpressions(): never[];
    setExpressionAt(): void;
    isStatic(): boolean;
    setPointer(value: unknown): void;
    setFunctionCall(value?: boolean): void;
    setName(name: string): void;
    setExecutionEnv(executionEnv: ExecutionEnvironment): void;
    eval(): any;
    toString(): string;
}
