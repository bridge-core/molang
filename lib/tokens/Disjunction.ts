import { Token, CombinatorToken } from "./Token";
import { Tokenizer } from "../Tokenizer";

export class Disjunction extends CombinatorToken {
    token_type = "MoLang.Disjunction";
    protected tokens: [Token, Token];

    constructor(str: string) {
        super();
        let split_index = str.indexOf("|");
        this.tokens = [
            Tokenizer.parse(str.substring(0, split_index)),
            Tokenizer.parse(str.substring(split_index + 2, str.length))
        ];
    }

    eval() {
        return this.tokens[0].eval() || this.tokens[1].eval();
    }
    negate() {
        return this.tokens[0].negate() || this.tokens[1].eval();
    }

    static is(str: string) {
        return this.isWrapper(str, "||");
    }
}