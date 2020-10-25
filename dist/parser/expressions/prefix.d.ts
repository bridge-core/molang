import { TTokenType } from '../../tokenizer/token';
import { Expression, IExpression } from '../expression';
export declare class PrefixExpression extends Expression {
    protected tokenType: TTokenType;
    protected expression: IExpression;
    type: string;
    constructor(tokenType: TTokenType, expression: IExpression);
    isStatic(): boolean;
    eval(): number | boolean | undefined;
}
