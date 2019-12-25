"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../tokens/Token");
function isTokenArr(t) {
    if (Array.isArray(t) && t[0] instanceof Token_1.Token)
        return true;
    return false;
}
exports.isTokenArr = isTokenArr;
//# sourceMappingURL=isTokenArr.js.map