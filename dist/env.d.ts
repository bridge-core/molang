export declare class ExecutionEnvironment {
    protected env: Record<string, any>;
    protected initialKeys: Set<string>;
    constructor(env: Record<string, any>);
    protected flattenEnv(newEnv: Record<string, any>, addKey?: string, current?: any): any;
    setAt(lookup: string, value: unknown): unknown;
    getFrom(lookup: string): any;
    isInitialKey(key: string): boolean;
}
