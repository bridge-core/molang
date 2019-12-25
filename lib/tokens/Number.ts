import { Token } from "./Token";

export class NumberToken extends Token<number> {
    token_type = "MoLang.NumberToken";
    constructor(private str: string) {
        super();
    }

    get token_data() {
        return Number(this.str);
    }

    static is(str: string) {
        return !isNaN(Number(str));
    }
}