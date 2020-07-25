import { IExpression } from '../expression'

export class OperatorExpression implements IExpression {
	constructor(
		protected leftExpression: IExpression,
		protected operator: string,
		protected rightExpression: IExpression
	) {}
}
