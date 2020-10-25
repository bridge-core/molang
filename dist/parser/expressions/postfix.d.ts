import { TTokenType } from '../../tokenizer/token';
import { Expression, IExpression } from '../expression';
export declare class PostfixExpression extends Expression {
    protected expression: IExpression;
    protected tokenType: TTokenType;
    type: string;
    constructor(expression: IExpression, tokenType: TTokenType);
    isStatic(): boolean;
    eval(): void;
}
