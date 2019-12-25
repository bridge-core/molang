export interface StoreData {
    [var_name: string]: number | string
}

export class Store {
    constructor(private data: StoreData) {}

    set(var_name: string, val: number | string) {
        this.data[var_name] = val;
    }
    get(var_name: string) {
        return this.data[var_name];
    }
}