import { IExpression } from './parser/expression';
import { tokenize } from './tokenizer/tokenize';
export declare function clearCache(): void;
export interface IParserConfig {
    useCache: boolean;
    maxCacheSize: number;
    useOptimizer: boolean;
    useAgressiveStaticOptimizer: boolean;
    partialResolveOnParse: boolean;
    tokenizer: ReturnType<typeof tokenize>;
}
export declare function execute(expression: string, env?: Record<string, unknown> | undefined, config?: Partial<IParserConfig>): unknown;
export declare function parse(expression: string, { useCache, useOptimizer, useAgressiveStaticOptimizer, maxCacheSize, tokenizer, }?: Partial<IParserConfig>): IExpression;
export { tokenize } from './tokenizer/tokenize';
export { setEnv } from './env';
export { IExpression } from './parser/expression';
