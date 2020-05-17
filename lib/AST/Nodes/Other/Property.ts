import { ASTNode, TEvalResult } from '../../ASTNode'
import { ENV } from '../../ENV'

export class PropertyNode extends ASTNode {
	type = 'MoLang.PropertyNode'
	constructor(protected expression: string) {
		super()
	}

	findValue() {
		let path = this.expression.split('.')
		let current = ENV.value[<string>path.shift()]

		while (path.length > 0) current = current[<string>path.shift()]

		return current
	}
	set([_, val]: TEvalResult) {
		let path = this.expression.split('.')
		let current = ENV.value[<string>path.shift()]

		while (path.length > 1) current = current[<string>path.shift()]
		current[<string>path.shift()] = val

		return 0.0
	}
	eval(...args: unknown[]): TEvalResult {
		const value = this.findValue()
		if (typeof value === 'function') return [false, value(...args)]
		else if (value !== undefined) return [false, value]
		else
			throw new Error(
				`Undefined property reference: "${this.expression}"`
			)
	}
	toString() {
		return this.expression
	}
}

export function testProperty(expression: string) {
	if (/(([aA-zZ]([aA-zZ]|[0-9]|)*)\.?)+/y.test(expression))
		return new PropertyNode(expression)
}
