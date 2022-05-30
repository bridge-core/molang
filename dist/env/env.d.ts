export declare type TVariableHandler = (variableName: string, variables: Record<string, unknown>) => unknown;
export interface IEnvConfig {
    useRadians?: boolean;
    convertUndefined?: boolean;
    variableHandler?: TVariableHandler;
    isFlat?: boolean;
}
export declare class ExecutionEnvironment {
    readonly config: IEnvConfig;
    protected env: Record<string, any>;
    constructor(env: Record<string, any>, config: IEnvConfig);
    updateConfig({ variableHandler, convertUndefined, useRadians, }: IEnvConfig): void;
    get(): Record<string, any>;
    protected flattenEnv(newEnv: Record<string, any>, addKey?: string, current?: any): any;
    setAt(lookup: string, value: unknown): unknown;
    getFrom(lookup: string): any;
}
export declare class Context {
    readonly env: any;
    readonly __isContext = true;
    constructor(env: any);
}
