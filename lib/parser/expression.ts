/**
 * Interface that describes an AST Expression
 */
export interface IExpression {
	readonly type: string
	readonly isReturn?: boolean
	readonly isBreak?: boolean
	readonly isContinue?: boolean
	readonly allExpressions: IExpression[]

	setFunctionCall?: (value: boolean) => void
	setPointer?: (value: unknown) => void
	eval(): unknown
	isStatic(): boolean
	iterate(cb: TIterateCallback): IExpression
	_iterateHelper(cb: TIterateCallback): void
}

export abstract class Expression implements IExpression {
	public abstract readonly type: string

	abstract eval(): unknown
	abstract isStatic(): boolean

	toString() {
		return `${this.eval()}`
	}

	abstract allExpressions: IExpression[]
	abstract setExpressionAt(index: number, expr: IExpression): void

	iterate(cb: TIterateCallback): IExpression {
		let expr = cb(this) ?? this

		expr._iterateHelper(cb)

		return expr
	}
	_iterateHelper(cb: TIterateCallback) {
		for (let i = 0; i < this.allExpressions.length; i++) {
			const originalExpr = this.allExpressions[i]
			const expr = cb(originalExpr)

			if (expr) {
				this.setExpressionAt(i, expr)
				expr._iterateHelper(cb)
			} else {
				originalExpr._iterateHelper(cb)
			}
		}
	}
}

export type TIterateCallback = (expr: IExpression) => IExpression | undefined
