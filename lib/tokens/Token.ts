export abstract class Token {
    /**
     * Should be overwritten; should return whether the given str can be matched to "this" token type
     * @param str String to match to the token
     * @returns Whether the given str can be matched to this token type
     */
    static is(str: string) {
        return false;
    }

    /**
     * Returns the current token type
     */
    abstract token_type: string;

    /**
     * Implement how this specific Token gets evaluated
     */
    abstract eval(): string | number;

    /**
     * Implement how negating this specific Token works
     */
    abstract negate(): string | number;
}

export abstract class DefaultToken extends Token {
    protected abstract token: Token;
    negate() {
        return Number(!this.token.eval());
    }
}