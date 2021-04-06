import { Parser } from './parser/parse';
export declare type TVariableHandler = (variableName: string, variables: Record<string, unknown>) => unknown;
export declare class ExecutionEnvironment {
    protected parser: Parser;
    protected variableHandler: TVariableHandler;
    protected env: Record<string, any>;
    constructor(parser: Parser, env: Record<string, any>, variableHandler?: TVariableHandler, isFlat?: boolean);
    protected flattenEnv(newEnv: Record<string, any>, addKey?: string, current?: any): any;
    setAt(lookup: string, value: unknown): unknown;
    getFrom(lookup: string): any;
}
