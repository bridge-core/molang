"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("./Store");
const Tokenizer_1 = require("./Tokenizer");
const Resolver_1 = require("./Resolver");
class Interpreter {
    constructor(env) {
        this.store = new Store_1.Store(env);
    }
    parse(str) {
        return Resolver_1.Resolver.eval(Tokenizer_1.Tokenizer.parse(str));
    }
}
exports.Interpreter = Interpreter;
console.log(new Interpreter({}).parse("0.0 ? 'hello world' : 'nope'"));
//# sourceMappingURL=main.js.map