import { DefaultToken, Token } from "./Token";
import { Tokenizer } from "../Tokenizer";

export class Negation extends DefaultToken {
    token_type = "MoLang.Negation";
    protected token: Token;

    constructor(str: string) {
        super();
        this.token = Tokenizer.parse(str.substring(1, str.length));
    }

    eval() {
        return this.token.negate();
    }

    static is(str: string) {
        return str.startsWith("!");
    }
}