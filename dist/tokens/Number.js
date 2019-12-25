"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
class NumberToken extends Token_1.Token {
    constructor(str) {
        super();
        this.str = str;
        this.token_type = "MoLang.NumberToken";
    }
    get token_data() {
        return Number(this.str);
    }
    static is(str) {
        return !isNaN(Number(str));
    }
}
exports.NumberToken = NumberToken;
//# sourceMappingURL=Number.js.map