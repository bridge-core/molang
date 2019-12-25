"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const Tokenizer_1 = require("../Tokenizer");
class Ternary extends Token_1.Token {
    constructor(str) {
        super();
        this.token_type = "MoLang.Ternary";
        let cond = str.split("?");
        let opts = cond[1].split(":");
        this.data = [cond[0], opts[0], opts[1]]
            .map(str => Tokenizer_1.Tokenizer.parse(str));
    }
    get token_data() {
        return this.data;
    }
    static is(str) {
        let cond = str.split("?");
        return cond[1] !== undefined && cond[1].includes(":");
    }
}
exports.Ternary = Ternary;
//# sourceMappingURL=Ternary.js.map