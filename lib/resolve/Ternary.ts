import { Token } from "../tokens/Token";
import { Resolver } from "../Resolver";

export function resolveTernary(tokens: Token<unknown>[]) {
    return Resolver.eval(tokens[0]) ?Resolver.eval(tokens[1]) : Resolver.eval(tokens[2]);
}