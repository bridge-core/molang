import { NameExpression } from './name';
import { Expression, IExpression } from '../expression';
import { ExecutionEnvironment } from '../../env/env';
export declare class FunctionExpression extends Expression {
    protected name: NameExpression;
    protected args: IExpression[];
    type: string;
    constructor(name: NameExpression, args: IExpression[]);
    get allExpressions(): (NameExpression | IExpression)[];
    setExpressionAt(index: number, expr: Expression): void;
    setExecutionEnv(executionEnv: ExecutionEnvironment): void;
    get executionEnv(): ExecutionEnvironment;
    isStatic(): boolean;
    eval(): unknown;
    toString(): string;
}
