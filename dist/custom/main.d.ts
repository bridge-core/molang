import { MoLangParser } from '../parser/molang';
export declare class CustomMoLangParser extends MoLangParser {
    constructor(useOptimizer?: boolean, agressiveStaticOptimizer?: boolean);
}
export declare function parseCustomSyntax(expression: string): unknown;
