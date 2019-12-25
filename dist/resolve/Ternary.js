"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resolver_1 = require("../Resolver");
function resolveTernary(tokens) {
    return Resolver_1.Resolver.eval(tokens[0]) ? Resolver_1.Resolver.eval(tokens[1]) : Resolver_1.Resolver.eval(tokens[2]);
}
exports.resolveTernary = resolveTernary;
//# sourceMappingURL=Ternary.js.map