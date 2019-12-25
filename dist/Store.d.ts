export interface StoreData {
    [var_name: string]: number | string;
}
export declare class Store {
    private data;
    constructor(data: StoreData);
    set(var_name: string, val: number | string): void;
    get(var_name: string): string | number;
}
