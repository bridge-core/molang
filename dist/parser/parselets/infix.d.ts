import { Parser } from '../parse';
import { IExpression } from '../expression';
import { Token } from '../../tokenizer/token';
export interface IInfixParselet {
    readonly precedence: number;
    parse: (parser: Parser, left: IExpression, token: Token) => IExpression;
}
