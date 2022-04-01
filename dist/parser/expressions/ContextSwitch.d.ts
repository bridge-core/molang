import { Expression, IExpression } from '../expression';
import { FunctionExpression } from './function';
import { NameExpression } from './name';
export declare class ContextSwitchExpression extends Expression {
    protected leftExpr: NameExpression | FunctionExpression;
    protected rightExpr: NameExpression | FunctionExpression;
    type: string;
    constructor(leftExpr: NameExpression | FunctionExpression, rightExpr: NameExpression | FunctionExpression);
    get allExpressions(): (NameExpression | FunctionExpression)[];
    setExpressionAt(index: number, expr: IExpression): void;
    isStatic(): boolean;
    eval(): any;
    toString(): string;
}
