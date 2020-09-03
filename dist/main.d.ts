import { IExpression } from './parser/expression';
export declare function clearCache(): void;
export interface IParserConfig {
    useCache: boolean;
    maxCacheSize: number;
    useOptimizer: boolean;
    useAgressiveStaticOptimizer: boolean;
}
export declare function execute(expression: string, env?: Record<string, unknown> | undefined, config?: Partial<IParserConfig>): unknown;
export declare function parse(expression: string, { useCache, useOptimizer, useAgressiveStaticOptimizer, maxCacheSize, }?: Partial<IParserConfig>): IExpression;
export { setEnv } from './env';
export { IExpression } from './parser/expression';
