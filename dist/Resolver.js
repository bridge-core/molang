"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ternary_1 = require("./resolve/Ternary");
class Resolver {
    static eval(token) {
        let data = token.token_data;
        switch (token.token_type) {
            case "MoLang.Group":
                return Resolver.eval(data);
            case "MoLang.Ternary":
                return Ternary_1.resolveTernary(data);
            case "MoLang.NumberToken":
            case "MoLang.StringToken":
                return token.token_data;
            default:
                return 0;
        }
    }
}
exports.Resolver = Resolver;
//# sourceMappingURL=Resolver.js.map