import { Store, StoreData } from "./Store";
import { Tokenizer } from "./Tokenizer";

export class Interpreter {
    private store: Store;

    constructor(env: StoreData) {
        this.store = new Store(env);
    }
    parse(str: string) {
        return Tokenizer.parse(str).eval();
    }
}

console.log(new Interpreter({}).parse("1.0 && !0.0 ? 'True' : 'False'"));