import { Store } from "../Store";

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
    abstract eval(store: Store): string | number | boolean;

    /**
     * Implement how negating this specific Token works
     */
    abstract negate(store: Store): string | number | boolean;

    /**
     * Implements whether a MoLang statement can be shortened
     */
    abstract canResolve(store: Store): boolean;

    /**
     * Implements how to shorten this MoLang statement
     */
    abstract resolve(store: Store): string;
}

export abstract class DefaultToken extends Token {
    negate(store: Store) {
        return !this.eval(store);
    }
}

export abstract class CombinatorToken extends Token {
    protected abstract tokens: [Token, Token];
    protected abstract operator: string;

    canResolve(store: Store) {
        return this.tokens[0].canResolve(store) && this.tokens[1].canResolve(store);
    }
    resolve(store: Store) {
        if(this.canResolve(store)) return "" + this.eval(store);
        return `${this.tokens[0].resolve(store)} ${this.operator} ${this.tokens[1].resolve(store)}`;
    }

    static is(str: string, op?: string) {
        if(op === undefined) return false;
        
        let brackets = 0;
        let brackets_1 = 0;

        for(let i = 0; i < str.length; i++) {   
            let char = str[i];
            let next_char = str[i+1];
            if(char === "(")
                brackets++;
            else if(char === ")")
                brackets--;
            if(char === "[")
                brackets_1++;
            else if(char === "]")
                brackets_1--;
            else if(brackets === 0 && brackets_1 === 0 && char === op[0] && (op[1] === undefined || next_char === op[1]))
                return true;
        }
        return false;
    }
}