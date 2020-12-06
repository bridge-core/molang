import { TToken } from './token';
export interface IIterator {
    next: () => TToken;
    hasNext: () => boolean;
    step: () => void;
    getPosition: () => {
        startLineNumber: number;
        endLineNumber: number;
        startColumn: number;
        endColumn: number;
    };
}
export declare class Tokenizer {
    protected keywordTokens: Set<string>;
    protected i: number;
    protected lastStep: number;
    protected currentLine: number;
    protected lastStepLine: number;
    protected expression: string;
    constructor(addKeywords?: Set<string>);
    init(expression: string): void;
    getPosition(): {
        startLineNumber: number;
        endLineNumber: number;
        startColumn: number;
        endColumn: number;
    };
    step(): void;
    next(): TToken;
    hasNext(): boolean;
    protected isLetter(char: string): boolean;
    protected isNumber(char: string): boolean;
}
