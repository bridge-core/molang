import { Token } from "./Token";
import { Tokenizer } from "../Tokenizer";

export class Group extends Token<Token<unknown>> {
    token_type = "MoLang.Group";
    private data: Token<unknown>;

    constructor(str: string) {
        super();
        this.data = Tokenizer.parse(str);
    }

    get token_data() {
        return this.data;
    }

    static is(str: string) {
        return str[0] === "(" && str[str.length - 1] === ")";
    }
}