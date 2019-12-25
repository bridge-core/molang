import { Group } from "./Group";
import { Ternary } from "./Ternary";
import { NumberToken } from "./Number";
import { StringToken } from "./String";
export declare class CreateToken {
    private static tokens;
    static create(str: string): Group | Ternary | NumberToken | StringToken;
}
