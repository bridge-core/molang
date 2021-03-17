import { IExpression, IParserConfig } from '../main';
import { MoLangParser } from '../parser/molang';
export declare class CustomMoLangParser extends MoLangParser {
    readonly functions: Map<string, [string[], string]>;
    constructor(config: Partial<IParserConfig>);
    reset(): void;
}
export declare class CustomMoLang {
    protected parser: CustomMoLangParser;
    constructor(env: any);
    get functions(): Map<string, [string[], string]>;
    parse(expression: string): IExpression;
    transform(source: string): string;
    reset(): void;
}
