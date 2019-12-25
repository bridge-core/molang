import { Token } from "./Token";
export declare class StringToken extends Token<string> {
    private str;
    token_type: string;
    constructor(str: string);
    readonly token_data: string;
    static is(str: string): boolean;
}
