import { ExecutionEnvironment } from './env';
import { IExpression, IParserConfig } from './main';
import { MoLangParser } from './parser/molang';
export declare class MoLang {
    protected config: Partial<IParserConfig>;
    protected expressionCache: Record<string, IExpression>;
    protected totalCacheEntries: number;
    protected executionEnvironment: ExecutionEnvironment;
    protected parser: MoLangParser;
    constructor(env?: Record<string, unknown>, config?: Partial<IParserConfig>);
    updateConfig(newConfig: Partial<IParserConfig>): void;
    updateExecutionEnv(env: Record<string, unknown>, isFlat?: boolean): void;
    clearCache(): void;
    execute(expression: string): unknown;
    executeAndCatch(expression: string): unknown;
    parse(expression: string): IExpression;
    resolveStatic(ast: IExpression): void;
    getParser(): MoLangParser;
}
