import { Token, CombinatorToken } from "./Token";
import { Tokenizer } from "../Tokenizer";
import { Store } from "../Store";

export class SmallerEqualsThan extends CombinatorToken {
    token_type = "MoLang.SmallerEqualsThan";
    protected tokens: [Token, Token];

    constructor(str: string) {
        super();
        let split_index = str.indexOf("<");
        this.tokens = [
            Tokenizer.parse(str.substring(0, split_index)),
            Tokenizer.parse(str.substring(split_index + 2, str.length))
        ];
    }

    eval(store: Store) {
        return this.tokens[0].eval(store) <= this.tokens[1].eval(store);
    }
    negate(store: Store) {
        return this.tokens[0].negate(store) <= this.tokens[1].eval(store);
    }

    static is(str: string) {
        return this.isWrapper(str, "<=");
    }
}