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
	setExpressionAt(index: number, expr: IExpression): void
	eval(): unknown
	isStatic(): boolean
	walk(cb: TIterateCallback): IExpression
	iterate(cb: TIterateCallback, visited: Set<IExpression>): void
	some(predicate: (expr: IExpression) => boolean): boolean
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

	walk(cb: TIterateCallback, visited = new Set<IExpression>()): IExpression {
		let expr = cb(this) ?? this

		expr.iterate(cb, visited)

		return expr
	}
	iterate(cb: TIterateCallback, visited: Set<IExpression>) {
		for (let i = 0; i < this.allExpressions.length; i++) {
			const originalExpr = this.allExpressions[i]
			if (visited.has(originalExpr)) continue
			else visited.add(originalExpr)

			const expr = cb(originalExpr) ?? originalExpr

			if (expr !== originalExpr && visited.has(expr)) continue
			else visited.add(expr)

			this.setExpressionAt(i, expr)
			expr.iterate(cb, visited)
		}
	}
	some(predicate: (expr: IExpression) => boolean) {
		return this.allExpressions.some(
			(expr) => predicate(expr) || expr.some(predicate)
		)
	}
}

export type TIterateCallback = (expr: IExpression) => IExpression | undefined
