import { Expression, IExpression } from '../expression';
export declare class StatementExpression extends Expression {
    protected expressions: IExpression[];
    type: string;
    protected didReturn: boolean;
    protected wasLoopBroken: boolean;
    protected wasLoopContinued: boolean;
    constructor(expressions: IExpression[]);
    get allExpressions(): IExpression[];
    setExpressionAt(index: number, expr: IExpression): void;
    get isReturn(): boolean;
    get isBreak(): boolean;
    get isContinue(): boolean;
    isStatic(): boolean;
    eval(): unknown;
    getExpression(): IExpression;
    toString(): string;
}
