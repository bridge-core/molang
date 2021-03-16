import { Tokenizer } from './tokenizer/main';
export interface IParserConfig {
    useCache: boolean;
    maxCacheSize: number;
    useOptimizer: boolean;
    useAgressiveStaticOptimizer: boolean;
    partialResolveOnParse: boolean;
    tokenizer: Tokenizer;
    keepGroups: boolean;
}
export { Tokenizer } from './tokenizer/main';
export { IExpression } from './parser/expression';
export { CustomMoLang } from './custom/main';
export { MoLang } from './MoLang';
