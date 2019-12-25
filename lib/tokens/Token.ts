export abstract class Token<T> {
    /**
     * Needs to be implemented
     * @returns Data of this token
     */
    abstract get token_data(): T;

    /**
     * Returns the current token type
     */
    abstract token_type: string;

    /**
     * Should be overwritten; should return whether the given str can be matched to "this" token type
     * @param str String to match to the token
     * @returns Whether the given str can be matched to this token type
     */
    static is(str: string) {
        return false;
    }
}