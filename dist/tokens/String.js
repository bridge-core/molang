"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
class StringToken extends Token_1.Token {
    constructor(str) {
        super();
        this.str = str;
        this.token_type = "MoLang.StringToken";
    }
    get token_data() {
        return this.str;
    }
    static is(str) {
        return true;
    }
}
exports.StringToken = StringToken;
//# sourceMappingURL=String.js.map