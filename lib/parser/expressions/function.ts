import { NameExpression } from './name'
import { Expression } from '../expression'

export class FunctionExpression extends Expression {
	type = 'FunctionExpression'

	constructor(protected name: Expression, protected args: Expression[]) {
		super()
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
				`${(<NameExpression>this.name).getAsString()} is not callable!`
			)
		return func(...args)
	}
}
