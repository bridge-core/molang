import { NameExpression } from './name'
import { Expression, IExpression } from '../expression'

export class FunctionExpression extends Expression {
	type = 'FunctionExpression'

	constructor(protected name: IExpression, protected args: IExpression[]) {
		super()
	}

	get allExpressions() {
		return [this.name, ...this.args]
	}
	setExpressionAt(index: number, expr: Expression) {
		if (index === 0) this.name = expr
		else if (index > 0) this.args[index - 1] = expr
	}

	isStatic() {
		return false
	}

	eval() {
		const args: unknown[] = []
		let i = 0
		while (i < this.args.length) args.push(this.args[i++].eval())

		const func = <(...args: unknown[]) => unknown>this.name.eval()
		if (typeof func !== 'function')
			throw new Error(
				`${(<NameExpression>this.name).toString()} is not callable!`
			)
		return func(...args)
	}

	toString() {
		let str = `${this.name.toString()}(`
		for (let i = 0; i < this.args.length; i++) {
			str += `${this.args[i].toString()}${
				i + 1 < this.args.length ? ',' : ''
			}`
		}

		return `${str})`
	}
}
