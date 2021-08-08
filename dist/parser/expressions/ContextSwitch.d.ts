import { Expression, IExpression } from '../expression';
import { NameExpression } from './name';
export declare class ContextSwitchExpression extends Expression {
    protected leftExpr: NameExpression;
    protected rightExpr: NameExpression;
    type: string;
    constructor(leftExpr: NameExpression, rightExpr: NameExpression);
    get allExpressions(): NameExpression[];
    setExpressionAt(index: number, expr: IExpression): void;
    isStatic(): boolean;
    eval(): any;
    toString(): string;
}
