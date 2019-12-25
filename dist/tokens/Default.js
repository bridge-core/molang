"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
class DefaultToken extends Token_1.Token {
    constructor(str) {
        super();
        this.str = str;
        this.token_type = "MoLang.DefaultToken";
    }
    get token_data() {
        return this.str;
    }
}
exports.DefaultToken = DefaultToken;
//# sourceMappingURL=Default.js.map