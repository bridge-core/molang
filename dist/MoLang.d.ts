import { ExecutionEnvironment } from './env/env';
import { IExpression, IParserConfig } from './main';
import { MolangParser } from './parser/molang';
export declare class Molang {
    protected config: Partial<IParserConfig>;
    protected expressionCache: Record<string, IExpression>;
    protected totalCacheEntries: number;
    protected executionEnvironment: ExecutionEnvironment;
    protected parser: MolangParser;
    constructor(env?: Record<string, unknown>, config?: Partial<IParserConfig>);
    updateConfig(newConfig: Partial<IParserConfig>): void;
    updateExecutionEnv(env: Record<string, unknown>, isFlat?: boolean): void;
    clearCache(): void;
    execute(expression: string): unknown;
    executeAndCatch(expression: string): unknown;
    parse(expression: string): IExpression;
    rearrangeOptimally(ast: IExpression): IExpression;
    resolveStatic(ast: IExpression): IExpression;
    minimize(ast: IExpression): IExpression;
    getParser(): MolangParser;
}
