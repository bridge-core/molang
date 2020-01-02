import { DefaultToken, Token } from "./Token";
import { Tokenizer } from "../Tokenizer";
import { Store } from "../Store";

export class Negation extends DefaultToken {
    token_type = "MoLang.Negation";
    protected token: Token;

    constructor(str: string) {
        super();
        this.token = Tokenizer.parse(str.substring(1, str.length));
    }

    eval(store: Store) {
        return this.token.negate(store);
    }

    static is(str: string) {
        return str.startsWith("!");
    }
}