import { Token } from "./Token";
import { Tokenizer } from "../Tokenizer";

export class Ternary extends Token<Token<unknown>[]> {
    token_type = "MoLang.Ternary";
    private data: Token<unknown>[];

    constructor(str: string) {
        super();
        let cond = str.split("?");
        let opts = cond[1].split(":");

        this.data = [ cond[0], opts[0], opts[1] ]
            .map(str => Tokenizer.parse(str));
    }

    get token_data() {
        return this.data;
    }

    static is(str: string) {
        let cond = str.split("?");
        return cond[1] !== undefined && cond[1].includes(":");
    }
}