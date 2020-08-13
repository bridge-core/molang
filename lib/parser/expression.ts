export interface IExpression {
	readonly isReturn?: boolean
	eval(): unknown
	isStatic(): boolean
}
