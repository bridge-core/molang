import { TVariableHandler } from './env/env';
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
    assumeFlatEnvironment: boolean;
}
export { Tokenizer } from './tokenizer/Tokenizer';
export type { IExpression } from './parser/expression';
export { CustomMolang } from './custom/main';
export { Molang } from './Molang';
export * as expressions from './parser/expressions/index';
export { Context } from './env/env';
