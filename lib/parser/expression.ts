export interface IExpression {
	readonly isReturn?: boolean
	readonly isBreak?: boolean
	readonly isContinue?: boolean

	setPointer?: (value: unknown) => void
	eval(): unknown
	isStatic(): boolean
}
