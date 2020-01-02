import { Token, DefaultToken } from "./Token";
import { Store } from "../Store";
import { Tokenizer } from "../Tokenizer";

export class FunctionCall extends DefaultToken {
    token_type = "MoLang.FunctionCall";
    protected resolve: (store: Store) => number | string | boolean;

    constructor(str: string) {
        super();
        let split_index = str.indexOf("(");
        let end_bracket = str.lastIndexOf(")");
        let access = str.substring(0, split_index);
        let args = str.substring(split_index + 1, end_bracket)
            .split(/\,/g)
            .map(part => Tokenizer.parse(part));

        this.resolve = (store) => {
            let res = store.get(access)(...args.map(a => a.eval(store)));

            //Function call like "root().slot"
            if(end_bracket + 1 !== str.length && str[end_bracket + 1] === ".")
                return Tokenizer.parse(str.substring(end_bracket + 2, str.length)).eval(new Store(res))

            return res;
        }        
    }

    eval(store: Store) {
        return this.resolve(store);
    }

    static is(str: string) {
        return /([a-z]|[A-Z]|[0-9]|_|\.)+(\(\)|\(.+\))/.test(str);
    }
}