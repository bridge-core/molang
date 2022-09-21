export declare type TTokenType = string;
export declare class Token {
    protected type: string;
    protected text: string;
    protected startColumn: number;
    protected startLine: number;
    constructor(type: string, text: string, startColumn: number, startLine: number);
    getType(): string;
    getText(): string;
    getPosition(): {
        startColumn: number;
        startLineNumber: number;
        endColumn: number;
        endLineNumber: number;
    };
}
