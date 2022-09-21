import { TTokenType } from '../../tokenizer/token';
import { Expression, IExpression } from '../expression';
export declare class PostfixExpression extends Expression {
    protected expression: IExpression;
    protected tokenType: TTokenType;
    type: string;
    constructor(expression: IExpression, tokenType: TTokenType);
    get allExpressions(): IExpression[];
    setExpressionAt(_: number, expr: IExpression): void;
    isStatic(): boolean;
    eval(): void;
}
