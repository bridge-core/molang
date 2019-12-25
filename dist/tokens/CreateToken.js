"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = require("./Group");
const Ternary_1 = require("./Ternary");
const Number_1 = require("./Number");
const String_1 = require("./String");
class CreateToken {
    static create(str) {
        for (let T of this.tokens) {
            if (T.is(str))
                return new T(str);
        }
        throw new Error(`Unable to match expression "${str}" to token type.`);
    }
}
CreateToken.tokens = [
    Group_1.Group,
    Ternary_1.Ternary,
    Number_1.NumberToken,
    String_1.StringToken
];
exports.CreateToken = CreateToken;
//# sourceMappingURL=CreateToken.js.map