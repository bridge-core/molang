export interface IExpression {
    readonly type: string;
    readonly isReturn?: boolean;
    readonly isBreak?: boolean;
    readonly isContinue?: boolean;
    setFunctionCall?: (value: boolean) => void;
    setPointer?: (value: unknown) => void;
    eval(): unknown;
    isStatic(): boolean;
    iterate(cb: TIterateCallback): IExpression;
    _iterateHelper(cb: TIterateCallback): void;
}
export declare abstract class Expression implements IExpression {
    abstract readonly type: string;
    abstract eval(): unknown;
    abstract isStatic(): boolean;
    toString(): string;
    abstract allExpressions: IExpression[];
    abstract setExpressionAt(index: number, expr: IExpression): void;
    iterate(cb: TIterateCallback): IExpression;
    _iterateHelper(cb: TIterateCallback): void;
}
export declare type TIterateCallback = (expr: IExpression) => IExpression | undefined;
