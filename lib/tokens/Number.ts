import { Token } from "./Token";
import { Store } from "../Store";

export class NumberToken extends Token {
    token_type = "MoLang.NumberToken";
    protected data: number;

    constructor(str: string) {
        super();

        this.data = Number(str);
    }

    eval(store: Store) {
        return this.data;
    }

    negate(store: Store) {
        return this.data === 0 ? 1 : 0;
    }

    static is(str: string) {
        return !isNaN(Number(str));
    }
}