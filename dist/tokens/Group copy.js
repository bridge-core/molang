"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const Tokenizer_1 = require("../Tokenizer");
class Group extends Token_1.Token {
    constructor(str) {
        super();
        this.str = str;
        this.token_type = "MoLang.Group";
        this.data = Tokenizer_1.Tokenizer.parse(this.str);
    }
    get token_data() {
        return this.data;
    }
    static is(str) {
        return str[0] === "(" && str[str.length - 1] === ")";
    }
}
exports.Group = Group;
//# sourceMappingURL=Group copy.js.map