import { Parser } from '../parser/parse';
import { TToken } from '../parser/../tokenizer/token';
import { IPrefixParselet } from '../parser/parselets/prefix';
import { IExpression } from '../parser/expression';
export declare class CustomFunctionParselet implements IPrefixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, token: TToken): CustomFunctionExpression;
}
declare class CustomFunctionExpression implements IExpression {
    protected functionName: string;
    protected args: string[];
    protected functionBody: IExpression;
    constructor(functionName: string, args: string[], functionBody: IExpression);
    get isReturn(): boolean;
    isStatic(): boolean;
    eval(): number;
}
export {};
