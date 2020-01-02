export function splitArgs(str: string) {
    let res: string[] = [];
    let curr: string = "";
    let brackets = 0;

    for(let c of str) {
        if(c === "(") brackets++;
        else if(c === ")") brackets--;

        if(c === "," && brackets === 0) {
            res.push(curr.trim());
            curr = "";
        } else {
            curr += c;
        }
    }

    return res.concat([curr]);
}