export type TTokenType = string

export class Token {
	constructor(
		protected type: string,
		protected text: string,
		protected startColumn: number,
		protected startLine: number
	) {}

	getType() {
		return this.type
	}
	getText() {
		return this.text
	}
}
