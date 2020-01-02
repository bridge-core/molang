import { Store, StoreData } from "./Store";
import { Tokenizer } from "./Tokenizer";

export class Interpreter {
    private store: Store;

    constructor(env: StoreData) {
        this.store = new Store(env);
    }
    parse(str: string) {
        let res = Tokenizer.parse(str).eval();
        if(typeof res === "boolean") return Number(res);
        return res;
    }
}

console.log(new Interpreter({}).parse("(1.0 * 0.0) + 1.0"));