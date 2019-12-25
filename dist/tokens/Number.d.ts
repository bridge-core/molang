import { Token } from "./Token";
export declare class NumberToken extends Token<number> {
    private str;
    token_type: string;
    constructor(str: string);
    readonly token_data: number;
    static is(str: string): boolean;
}
