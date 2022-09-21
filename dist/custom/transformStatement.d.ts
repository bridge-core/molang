import { IExpression } from '../parser/expression';
import { GroupExpression } from '../parser/expressions/group';
import { StatementExpression } from '../parser/expressions/statement';
export declare function transformStatement(expression: IExpression): IExpression | GroupExpression | StatementExpression;
