import { DefaultToken } from "./Token";
import { Store } from "../Store";
import { Tokenizer } from "../Tokenizer";
import { findClosingBracket } from "../util/findClosingBracket";

export class ArrayAccess extends DefaultToken {
    token_type = "MoLang.ArrayAccess";
    protected resolve: (store: Store) => number | string | boolean;

    constructor(str: string) {
        super();
        let split_index = str.indexOf("[");
        let end_bracket = findClosingBracket(str, split_index, 1);
        let access = str.substring(0, split_index);
        let index = Tokenizer.parse(str.substring(split_index + 1, end_bracket));
        

        this.resolve = (store) => {
            let arr = store.get(access);
            store.reset(); //Reset potential custom store

            let i = index.eval(store);
            if(typeof i !== "number")
                throw new Error(`Cannot use "${i}" to access an array index.`);

            let res = arr[i];

            //Array access like "root[0].slot"
            if(end_bracket + 1 !== str.length && str[end_bracket + 1] === ".")
                return Tokenizer.parse(str.substring(end_bracket + 2, str.length)).eval(new Store(store.interpreter, res));

            return res;
        }        
    }

    eval(store: Store) {
        return this.resolve(store);
    }

    static is(str: string) {
        if(-1 === str.indexOf("(") || str.indexOf("[") < str.indexOf("("))
            return /([a-z]|[A-Z]|[0-9]|_|\.)+(\[.+\])/.test(str);
        return false;
    }
}