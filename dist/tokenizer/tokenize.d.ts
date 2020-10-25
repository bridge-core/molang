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
export declare function tokenize(expression: string, addKeywords?: Set<string>): IIterator;
