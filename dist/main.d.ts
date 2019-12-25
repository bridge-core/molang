import { StoreData } from "./Store";
export declare class Interpreter {
    private store;
    constructor(env: StoreData);
    parse(str: string): string | number;
}
