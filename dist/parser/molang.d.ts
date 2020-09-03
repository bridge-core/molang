import { IIterator } from '../tokenizer/tokenize';
import { Parser } from './parse';
export declare class MoLangParser extends Parser {
    constructor(tokenIterator: IIterator, useOptimizer?: boolean, agressiveStaticOptimizer?: boolean);
}
