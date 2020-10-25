import { IIterator } from '../tokenizer/tokenize';
import { TTokenType, TToken } from '../tokenizer/token';
import { IPrefixParselet } from './parselets/prefix';
import { IInfixParselet } from './parselets/infix';
import { IExpression } from './expression';
export declare class Parser {
    protected tokenIterator: IIterator;
    readonly useOptimizer: boolean;
    readonly agressiveStaticOptimizer: boolean;
    readonly partialResolveOnParse: boolean;
    protected prefixParselets: Map<string, IPrefixParselet>;
    protected infixParselets: Map<string, IInfixParselet>;
    protected readTokens: TToken[];
    protected lastConsumed: TToken;
    constructor(tokenIterator: IIterator, useOptimizer?: boolean, agressiveStaticOptimizer?: boolean, partialResolveOnParse?: boolean);
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
