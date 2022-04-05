import { Parser } from '../parser/parse';
import { Token } from '../tokenizer/token';
import { IPrefixParselet } from '../parser/parselets/prefix';
import { Expression, IExpression } from '../parser/expression';
export declare class CustomClassParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: Token): CustomClassExpression;
}
declare class CustomClassExpression extends Expression {
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
