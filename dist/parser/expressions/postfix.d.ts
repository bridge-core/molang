import { TTokenType } from '../../tokenizer/token';
import { IExpression } from '../expression';
export declare class PostfixExpression {
    protected expression: IExpression;
    protected tokenType: TTokenType;
    constructor(expression: IExpression, tokenType: TTokenType);
    isStatic(): boolean;
    eval(): void;
}
