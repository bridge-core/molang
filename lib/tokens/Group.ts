import { DefaultToken, Token } from "./Token";
import { Tokenizer } from "../Tokenizer";
import { Store } from "../Store";

export class Group extends DefaultToken {
    token_type = "MoLang.Group";
    protected token: Token;

    constructor(str: string) {
        super();
        this.token = Tokenizer.parse(str.substring(1, str.length - 1));
    }

    eval(store: Store) {
        return this.token.eval(store);
    }

    static is(str: string) {
        return str.startsWith("(") && str.endsWith(")");
    }
}