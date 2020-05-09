import { ASTNode, IEvalResult } from '../ASTNode'
import { ENV } from '../ENV'
import { CONFIG } from '../../config'

export class PropertyNode extends ASTNode {
	type = 'MoLang.PropertyNode'
	protected expression = ''

	createChildren(expression: string) {
		this.expression = expression
		return this
	}

	findValue() {
		let path = this.expression.split('.')
		let current = ENV.value[<string>path.shift()]

		while (path.length > 0) current = current[<string>path.shift()]

		return current
	}
	eval(...args: unknown[]) {
		const value = this.findValue()
		if (typeof value === 'function')
			return {
				value: value(...args),
			}
		else if (value !== undefined)
			return {
				value,
			}
		else
			throw new Error(
				`Undefined property reference: "${this.expression}"`
			)
	}
	toString() {
		return this.expression
	}

	test(expression: string) {
		return {
			isCorrectToken: /(([aA-zZ]([aA-zZ]|[0-9]|)*)\.?)+/y.test(
				expression
			),
		}
	}
}
