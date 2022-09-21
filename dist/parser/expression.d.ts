export interface IExpression {
    readonly type: string;
    readonly isReturn?: boolean;
    readonly isBreak?: boolean;
    readonly isContinue?: boolean;
    readonly allExpressions: IExpression[];
    setFunctionCall?: (value: boolean) => void;
    setPointer?: (value: unknown) => void;
    setExpressionAt(index: number, expr: IExpression): void;
    eval(): unknown;
    isStatic(): boolean;
    walk(cb: TIterateCallback): IExpression;
    iterate(cb: TIterateCallback, visited: Set<IExpression>): void;
    some(predicate: (expr: IExpression) => boolean): boolean;
}
export declare abstract class Expression implements IExpression {
    abstract readonly type: string;
    abstract eval(): unknown;
    abstract isStatic(): boolean;
    toString(): string;
    abstract allExpressions: IExpression[];
    abstract setExpressionAt(index: number, expr: IExpression): void;
    walk(cb: TIterateCallback, visited?: Set<IExpression>): IExpression;
    iterate(cb: TIterateCallback, visited: Set<IExpression>): void;
    some(predicate: (expr: IExpression) => boolean): boolean;
}
export declare type TIterateCallback = (expr: IExpression) => IExpression | undefined;
