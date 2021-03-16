import { Parser } from '../parser/parse';
import { Token } from '../parser/../tokenizer/token';
import { IPrefixParselet } from '../parser/parselets/prefix';
import { Expression, IExpression } from '../parser/expression';
export declare class CustomFunctionParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: Token): CustomFunctionExpression;
}
declare class CustomFunctionExpression extends Expression {
    protected functionBody: IExpression;
    type: string;
    constructor(functions: Map<string, [string[], string]>, functionName: string, args: string[], functionBody: IExpression);
    get allExpressions(): IExpression[];
    setExpressionAt(_: number, expr: IExpression): void;
    get isReturn(): boolean;
    isStatic(): boolean;
    eval(): number;
}
export {};
