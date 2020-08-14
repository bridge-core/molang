export interface IExpression {
	readonly isReturn?: boolean
	setPointer?: (value: unknown) => void
	eval(): unknown
	isStatic(): boolean
}
