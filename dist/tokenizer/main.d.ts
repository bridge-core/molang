import { Token } from './token';
export declare class Tokenizer {
    protected keywordTokens: Set<string>;
    protected i: number;
    protected currentColumn: number;
    protected currentLine: number;
    protected expression: string;
    constructor(addKeywords?: Set<string>);
    next(): Token;
    hasNext(): boolean;
    protected isLetter(char: string): boolean;
    protected isNumber(char: string): boolean;
}
