import { DefaultToken, Token } from "./Token";
import { Tokenizer } from "../Tokenizer";

export class Group extends DefaultToken {
    token_type = "MoLang.Group";
    protected token: Token;

    constructor(str: string) {
        super();
        this.token = Tokenizer.parse(str.substring(1, str.length - 1));
    }

    eval() {
        return this.token.eval();
    }

    static is(str: string) {
        return str.startsWith("(") && str.endsWith(")");
    }
}