import { DefaultToken } from "./Token";
import { Store } from "../Store";
import { Tokenizer } from "../Tokenizer";
import { findClosingBracket } from "../util/findClosingBracket";
import { splitArgs } from "../util/splitArgs";

export class FunctionCall extends DefaultToken {
    token_type = "MoLang.FunctionCall";
    protected resolve: (store: Store) => number | string | boolean;

    constructor(str: string) {
        super();
        let split_index = str.indexOf("(");
        let end_bracket = findClosingBracket(str, split_index, 0);
        let access = str.substring(0, split_index);
        let args = splitArgs(str.substring(split_index + 1, end_bracket))
            .map(part => Tokenizer.parse(part));

        this.resolve = (store) => {
            // console.log(str, store);
            
            let func = store.get(access);
            store.reset(); //Reset a potential custom store
            // console.log(func, args.map(a => a.eval(store)));
            let res = func(...args.map(a => a.eval(store)));

            //Function call like "root().slot"
            if(end_bracket + 1 !== str.length && str[end_bracket + 1] === ".")
                return Tokenizer.parse(str.substring(end_bracket + 2, str.length)).eval(new Store(store.interpreter, res));

            return res;
        }        
    }

    eval(store: Store) {
        return this.resolve(store);
    }

    static is(str: string) {
        if(-1 === str.indexOf("[") || str.indexOf("(") < str.indexOf("["))
            return /([a-z]|[A-Z]|[0-9]|_|\.)+(\(\)|\(.+\))/.test(str);
        return false;
    }
}