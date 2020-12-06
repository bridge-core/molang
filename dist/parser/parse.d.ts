import { Tokenizer } from '../tokenizer/tokenize';
import { TTokenType, TToken } from '../tokenizer/token';
import { IPrefixParselet } from './parselets/prefix';
import { IInfixParselet } from './parselets/infix';
import { IExpression } from './expression';
import { ExecutionEnvironment } from '../env';
export declare class Parser {
    useOptimizer: boolean;
    agressiveStaticOptimizer: boolean;
    partialResolveOnParse: boolean;
    protected prefixParselets: Map<string, IPrefixParselet>;
    protected infixParselets: Map<string, IInfixParselet>;
    protected readTokens: TToken[];
    protected lastConsumed: TToken;
    protected tokenIterator: Tokenizer;
    executionEnv: ExecutionEnvironment;
    constructor(useOptimizer?: boolean, agressiveStaticOptimizer?: boolean, partialResolveOnParse?: boolean);
    updateConfig(useOptimizer?: boolean, agressiveStaticOptimizer?: boolean, partialResolveOnParse?: boolean): void;
    init(expression: string): void;
    setTokenizer(tokenizer: Tokenizer): void;
    setExecutionEnvironment(executionEnv: ExecutionEnvironment): void;
    parseExpression(precedence?: number): IExpression;
    parseInfixExpression(expressionLeft: IExpression, precedence?: number): IExpression;
    getPrecedence(): number;
    getLastConsumed(): TToken;
    consume(expected?: TTokenType): TToken;
    match(expected: TTokenType, consume?: boolean): boolean;
    lookAhead(distance: number): TToken;
    registerInfix(tokenType: TTokenType, infixParselet: IInfixParselet): void;
    registerPrefix(tokenType: TTokenType, prefixParselet: IPrefixParselet): void;
    getInfix(tokenType: TTokenType): IInfixParselet | undefined;
    getPrefix(tokenType: TTokenType): IPrefixParselet | undefined;
    getTokenizerPosition(): {
        startLineNumber: number;
        endLineNumber: number;
        startColumn: number;
        endColumn: number;
    };
}
