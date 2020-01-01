import { Group } from "./Group";
import { Ternary } from "./Ternary";
import { NumberToken } from "./Number";
import { StringToken } from "./String";
import { Negation } from "./Negation";
import { Conjunction } from "./Conjunction";
import { Disjunction } from "./Disjunction";

export class CreateToken {
    private static tokens = [
        Negation,
        Group,
        Ternary,

        Conjunction,
        Disjunction,

        NumberToken,
        StringToken
    ];

    static create(str: string) {
        for(let T of this.tokens) {
            if(T.is(str)) return new T(str);
        }
            
        
        throw new Error(`Unable to match expression "${str}" to token type.`);
    }
}