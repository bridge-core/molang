import { Token, CombinatorToken } from "./Token";
import { Tokenizer } from "../Tokenizer";
import { Store } from "../Store";

export class SetVar extends Token {
    token_type = "MoLang.SetVar";
    protected data: [string, Token];

    constructor(str: string) {
        super();
        let split_index = str.indexOf("=");
        this.data = [
            str.substring(0, split_index).trim(),
            Tokenizer.parse(str.substring(split_index + 2, str.length))
        ];
    }

    eval(store: Store) {
        store.set(this.data[0], this.data[1].eval(store));
        return 1;
    }
    negate(store: Store) {
        throw new Error(`Invalid negation in front of assignment: !${this.data[0]} = ...`);
        return 0;
    }

    static is(str: string) {
        return /([a-z]|[A-Z]|[0-9]|_|\.)+(=| =|= | = ).+/.test(str);
    }
}