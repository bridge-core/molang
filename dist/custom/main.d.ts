import { IParserConfig } from '../main';
import { MolangParser } from '../parser/molang';
import { IExpression } from '../parser/expression';
export declare class CustomMolangParser extends MolangParser {
    readonly functions: Map<string, [string[], string]>;
    readonly classes: Map<string, any>;
    constructor(config: Partial<IParserConfig>);
    reset(): void;
}
export declare class CustomMolang {
    protected parser: CustomMolangParser;
    constructor(env: any);
    get functions(): Map<string, [string[], string]>;
    parse(expression: string): IExpression;
    transform(source: string): string;
    reset(): void;
}
