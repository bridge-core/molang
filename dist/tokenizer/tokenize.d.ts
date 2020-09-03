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
export declare function tokenize(expression: string): IIterator;
export declare function isLetter(char: string): boolean;
export declare function isNumber(char: string): boolean;
