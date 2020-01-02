import { Token } from "./Token";
import { Tokenizer } from "../Tokenizer";
import { Store } from "../Store";

export class Ternary extends Token {
    token_type = "MoLang.Ternary";
    private data: Token[];

    constructor(str: string) {
        super();
        //Parse condition
        let index = str.indexOf("?");
        let cond = str.substring(0, index);
        //Parse body
        let body = str.substring(index + 1, str.length);
        index = body.indexOf(":");

        this.data = [ cond, body.substring(0, index), body.substring(index + 1, body.length) ]
            .map(str => Tokenizer.parse(str));
    }

    eval(store: Store) {
        return this.data[0].eval(store) ? this.data[1].eval(store) : this.data[2].eval(store);
    }
    negate(store: Store) {
        return this.data[0].negate(store) ? this.data[1].eval(store) : this.data[2].eval(store);
    }

    static is(str: string) {
        return /.+\?.+:.+/.test(str);
    }
}