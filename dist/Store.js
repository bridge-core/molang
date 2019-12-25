"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor(data) {
        this.data = data;
    }
    set(var_name, val) {
        this.data[var_name] = val;
    }
    get(var_name) {
        return this.data[var_name];
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map