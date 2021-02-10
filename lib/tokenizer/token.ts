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
	getPosition() {
		return {
			startColumn: this.startColumn,
			startLineNumber: this.startLine,
			endColumn: this.startLine + this.text.length,
			endLineNumber: this.startLine,
		}
	}
}
