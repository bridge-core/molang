/**
 * Interface that describes an AST Expression
 */
export interface IExpression {
	readonly isReturn?: boolean
	readonly isBreak?: boolean
	readonly isContinue?: boolean

	setFunctionCall?: (value: boolean) => void
	setPointer?: (value: unknown) => void
	eval(): unknown
	isStatic(): boolean
}
