export interface IExpression {
	eval(): unknown

	isStatic(): boolean
}
