export interface IExpression {
    readonly type: string;
    readonly isReturn?: boolean;
    readonly isBreak?: boolean;
    readonly isContinue?: boolean;
    setFunctionCall?: (value: boolean) => void;
    setPointer?: (value: unknown) => void;
    eval(): unknown;
    isStatic(): boolean;
}
export declare abstract class Expression implements IExpression {
    abstract readonly type: string;
    abstract eval(): unknown;
    abstract isStatic(): boolean;
}
