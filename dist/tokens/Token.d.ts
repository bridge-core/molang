export declare abstract class Token<T> {
    abstract readonly token_data: T;
    abstract token_type: string;
    static is(str: string): boolean;
}
