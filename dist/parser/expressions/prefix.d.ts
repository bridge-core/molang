import { TTokenType } from '../../tokenizer/token';
import { IExpression } from '../expression';
export declare class PrefixExpression {
    protected tokenType: TTokenType;
    protected expression: IExpression;
    constructor(tokenType: TTokenType, expression: IExpression);
    isStatic(): boolean;
    eval(): number | boolean | undefined;
}
