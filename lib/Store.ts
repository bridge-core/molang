export interface IStore {
    [var_name: string]: StoreTypes;
}
export type StoreTypes = number | string | boolean | IStore;

export class Store {
    constructor(private data: any) {}

    set(var_path: string, val: number | string | boolean) {
        Store.set(this.data, var_path, val);
    }
    get(var_path: string): any {
        return Store.get(this.data, var_path);
    }

    static get(current: any, var_path: string) {
        let var_path_arr = var_path.split(/\./g);

        var_path_arr.forEach((part, i) => {
            if(typeof current !== "object") throw new Error(`Cannot access property "${part}" of primitive value.`);
            current = current[part];
        });

        if(typeof current === "object")
            throw new Error("Trying to access a non-primitive value");
        return current;
    }
    static set(current: any, var_path: string, val: number | string | boolean) {
        let var_path_arr = var_path.split(/\./g);

        var_path_arr.forEach((part, i) => {
            if(typeof current !== "object") throw new Error(`Cannot access property "${part}" of primitive value.`);

            if(i + 1 === var_path_arr.length) current[part] = val;
            else current = current[part];
        });
    }
}