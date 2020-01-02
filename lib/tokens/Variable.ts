import { Token } from "./Token";
import { Store } from "../Store";

export class Variable extends Token {
    token_type = "MoLang.Variable";

    constructor(private str: string) {
        super();
    }

    eval(store: Store) {
        return store.get(this.str);
    }
    negate(store: Store) {
        return !store.get(this.str);
    }

    static is(str: string) {
        return /([a-z]|[A-Z]|[0-9]|_|\.)+/.test(str);
    }
}