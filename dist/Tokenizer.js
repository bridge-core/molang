"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateToken_1 = require("./tokens/CreateToken");
class Tokenizer {
    static parse(str) {
        return CreateToken_1.CreateToken.create(str.trim());
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map