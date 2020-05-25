import { Token } from "./Token";
import { Store } from "../Store";

export class StringToken extends Token {
    token_type = "MoLang.StringToken";
    constructor(private str: string) {
        super();
    }

    eval(store: Store) {
        return this.str.substring(1, this.str.length - 1);
    }
    negate(store: Store) {
        return !this.str;
    }

    static is(str: string) {
        return str.startsWith("'") && str.endsWith("'");
    }
}