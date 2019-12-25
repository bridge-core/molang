import { Token } from "./Token";

export class StringToken extends Token<string> {
    token_type = "MoLang.StringToken";
    constructor(private str: string) {
        super();
    }

    get token_data() {
        return this.str;
    }

    static is(str: string) {
        return true;
    }
}