import { IExpression } from '../expression'

export class NameExpression implements IExpression {
	constructor(protected name: string) {}
}
