import { Token, CombinatorToken } from "./Token";
import { Tokenizer } from "../Tokenizer";
import { toNumber } from "../util/toNumber";
import { Store } from "../Store";

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

    eval(store: Store) {
        let eval_arr = this.tokens.map(t => toNumber(t.eval(store)));
        return eval_arr[0] - eval_arr[1];
    }
    negate(store: Store) {
        let eval_arr = [this.tokens[0].negate(store), this.tokens[1].eval(store)].map(val => toNumber(val));
        return eval_arr[0] - eval_arr[1];
    }

    static is(str: string) {
        return this.isWrapper(str, "-");
    }
}