export function toNumber(val: string | number | boolean) {
    if(typeof val === "string") throw new Error("Cannot convert string to number");
    else if(typeof val === "boolean") return Number(val);
    return val;
}