import { Token } from "./tokens/Token";
import { CreateToken } from "./tokens/CreateToken";

export class Tokenizer {
    static parse(str: string): Token {
        return CreateToken.create(str.trim());
    }
}