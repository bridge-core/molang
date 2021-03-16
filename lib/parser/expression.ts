/**
 * Interface that describes an AST Expression
 */
export interface IExpression {
	readonly type: string
	readonly isReturn?: boolean
	readonly isBreak?: boolean
	readonly isContinue?: boolean

	setFunctionCall?: (value: boolean) => void
	setPointer?: (value: unknown) => void
	eval(): unknown
	isStatic(): boolean
}

export abstract class Expression implements IExpression {
	public abstract readonly type: string

	abstract eval(): unknown
	abstract isStatic(): boolean

	toString() {
		return `${this.eval()}`
	}

	// abstract iterate(): void
	// replace() {}
}
