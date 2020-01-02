import { Token, CombinatorToken } from "./Token";
import { Tokenizer } from "../Tokenizer";
import { isNumber } from "util";
import { toNumber } from "../util/toNumber";

export class Subtraction extends CombinatorToken {
    token_type = "MoLang.Subtraction";
    protected tokens: [Token, Token];

    constructor(str: string) {
        super();
        let split_index = str.indexOf("-");
        this.tokens = [
            Tokenizer.parse(str.substring(0, split_index)),
            Tokenizer.parse(str.substring(split_index + 1, str.length))
        ];
    }

    eval() {
        let eval_arr = this.tokens.map(t => toNumber(t.eval()));
        return eval_arr[0] - eval_arr[1];
    }
    negate() {
        let eval_arr = [this.tokens[0].negate(), this.tokens[1].eval()].map(val => toNumber(val));
        return eval_arr[0] - eval_arr[1];
    }

    static is(str: string) {
        return this.isWrapper(str, "-");
    }
}