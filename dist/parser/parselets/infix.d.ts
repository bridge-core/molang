import { Parser } from '../parse';
import { IExpression } from '../expression';
import { TToken } from '../../tokenizer/token';
export interface IInfixParselet {
    readonly precedence: number;
    parse: (parser: Parser, left: IExpression, token: TToken) => IExpression;
}
