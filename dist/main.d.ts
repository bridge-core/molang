import { IExpression } from './parser/expression';
import { MoLangParser } from './parser/molang';
import { tokenize } from './tokenizer/tokenize';
import { ExecutionEnvironment } from './env';
export interface IParserConfig {
    useCache: boolean;
    maxCacheSize: number;
    useOptimizer: boolean;
    useAgressiveStaticOptimizer: boolean;
    partialResolveOnParse: boolean;
    tokenizer: ReturnType<typeof tokenize>;
}
export declare class MoLang {
    protected config: Partial<IParserConfig>;
    protected expressionCache: Record<string, IExpression>;
    protected totalCacheEntries: number;
    protected executionEnvironment: ExecutionEnvironment;
    protected parser: MoLangParser;
    constructor(env?: Record<string, unknown>, config?: Partial<IParserConfig>);
    updateConfig(newConfig: Partial<IParserConfig>): void;
    clearCache(): void;
    execute(expression: string): unknown;
    executeAndCatch(expression: string): unknown;
    parse(expression: string): IExpression;
}
export default MoLang;
export { tokenize } from './tokenizer/tokenize';
export { IExpression } from './parser/expression';
