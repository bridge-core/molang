import { Token } from "./tokens/Token";
import { resolveTernary } from "./resolve/Ternary";

export class Resolver {
    static eval(token: Token<unknown>): string | number {        
        let data = token.token_data;

        switch(token.token_type) {
            case "MoLang.Group": 
                return Resolver.eval(<Token<unknown>> data);
            case "MoLang.Ternary":
                return resolveTernary(<Token<unknown>[]> data);
            case "MoLang.NumberToken": 
            case "MoLang.StringToken":
                return <number | string> token.token_data;
            default: 
                return 0;
        }
    }
}