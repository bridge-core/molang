import { MoLangParser } from '../parser/molang';
import { IIterator } from '../tokenizer/tokenize';
export declare class CustomMoLangParser extends MoLangParser {
    constructor(tokenIterator: IIterator, useOptimizer?: boolean, agressiveStaticOptimizer?: boolean);
}
export declare function parseCustomSyntax(expression: string): unknown;
