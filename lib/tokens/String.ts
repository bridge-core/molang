import { Token } from "./Token";

export class StringToken extends Token {
    token_type = "MoLang.StringToken";
    constructor(private str: string) {
        super();
    }

    eval() {
        return this.str.substring(1, this.str.length - 1);
    }

    negate(): number {
        throw new Error("Cannot negate string.");
    }

    static is(str: string) {
        return str.startsWith("'") && str.endsWith("'");
    }
}