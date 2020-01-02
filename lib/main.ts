import { Store, IStore } from "./Store";
import { Tokenizer } from "./Tokenizer";

export class Interpreter {
    private store: Store;

    constructor(env: any) {
        this.store = new Store(this, env);
    }
    parse(str: string) {
        let res = Tokenizer.parse(str).eval(this.store);
        if(typeof res === "boolean") return Number(res);
        return res;
    }

    getStore() {
        return this.store;
    }
}