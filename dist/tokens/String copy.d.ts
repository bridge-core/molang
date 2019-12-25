import { Token } from "./Token";
export declare class DefaultToken extends Token<string> {
    private str;
    token_type: string;
    constructor(str: string);
    readonly token_data: string;
}
