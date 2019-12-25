import { Token } from "./Token";
export declare class Group extends Token {
    private str;
    token_type: string;
    private data;
    constructor(str: string);
    readonly token_data: Token[];
    static is(str: string): boolean;
}
