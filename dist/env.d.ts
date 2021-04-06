export declare type TVariableHandler = (variableName: string, variables: Record<string, unknown>) => unknown;
export declare class ExecutionEnvironment {
    protected variableHandler: TVariableHandler;
    protected env: Record<string, any>;
    constructor(env: Record<string, any>, variableHandler?: TVariableHandler);
    protected flattenEnv(newEnv: Record<string, any>, addKey?: string, current?: any): any;
    setAt(lookup: string, value: unknown): unknown;
    getFrom(lookup: string): any;
}
