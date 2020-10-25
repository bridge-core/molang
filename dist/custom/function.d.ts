import { Parser } from '../parser/parse';
import { TToken } from '../parser/../tokenizer/token';
import { IPrefixParselet } from '../parser/parselets/prefix';
import { Expression, IExpression } from '../parser/expression';
export declare class CustomFunctionParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): CustomFunctionExpression;
}
declare class CustomFunctionExpression extends Expression {
    protected functionName: string;
    protected args: string[];
    protected functionBody: IExpression;
    type: string;
    constructor(functionName: string, args: string[], functionBody: IExpression);
    get isReturn(): boolean;
    isStatic(): boolean;
    eval(): number;
}
export {};
