import { IExpression } from '../expression';
export declare class StatementExpression implements IExpression {
    protected expressions: IExpression[];
    protected didReturn: boolean;
    protected wasLoopBroken: boolean;
    protected wasLoopContinued: boolean;
    constructor(expressions: IExpression[]);
    get isReturn(): boolean;
    get isBreak(): boolean;
    get isContinue(): boolean;
    isStatic(): boolean;
    eval(): unknown;
    getExpression(): IExpression;
}
