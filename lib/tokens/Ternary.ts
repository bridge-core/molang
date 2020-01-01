import { Token } from "./Token";
import { Tokenizer } from "../Tokenizer";

export class Ternary extends Token {
    token_type = "MoLang.Ternary";
    private data: Token[];

    constructor(str: string) {
        super();
        let cond = str.split("?");
        let opts = cond[1].split(":");

        this.data = [ cond[0], opts[0], opts[1] ]
            .map(str => Tokenizer.parse(str));
    }

    eval() {
        return this.data[0].eval() ? this.data[1].eval() : this.data[2].eval();
    }
    negate() {
        return this.data[0].negate() ? this.data[1].eval() : this.data[2].eval();
    }

    static is(str: string) {
        return /.+\?.+:.+/.test(str);
    }
}