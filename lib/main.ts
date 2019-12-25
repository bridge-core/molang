import { Store, StoreData } from "./Store";
import { Tokenizer } from "./Tokenizer";
import { Resolver } from "./Resolver";

export class Interpreter {
    private store: Store;

    constructor(env: StoreData) {
        this.store = new Store(env);
    }
    parse(str: string) {
        return Resolver.eval(Tokenizer.parse(str));
    }
}

console.log(new Interpreter({}).parse("0.0 ? 'hello world' : 'nope'"));