import { TVariableHandler } from './env';
import { Tokenizer } from './tokenizer/Tokenizer';
export interface IParserConfig {
    useCache: boolean;
    maxCacheSize: number;
    useOptimizer: boolean;
    useAgressiveStaticOptimizer: boolean;
    earlyReturnsSkipParsing: boolean;
    earlyReturnsSkipTokenization: boolean;
    tokenizer: Tokenizer;
    keepGroups: boolean;
    convertUndefined: boolean;
    useRadians: boolean;
    variableHandler: TVariableHandler;
}
export { Tokenizer } from './tokenizer/Tokenizer';
export { IExpression } from './parser/expression';
export { CustomMoLang } from './custom/main';
export { MoLang } from './MoLang';
export * as expressions from './parser/expressions/index';
