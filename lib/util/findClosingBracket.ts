export function getBrackets(bracket_type: 0 | 1): [string, string] {
    let b_open: string = "";
    let b_close: string = "";

    switch(bracket_type) {
        case 0: 
            b_open = "(";
            b_close = ")"; 
            break;
        case 1:
            b_open = "[";
            b_close = "]";
            break;
    }

    return [b_open, b_close];
}

export function findClosingBracket(str: string, start: number, bracket_type: 0 | 1) {
    const [b_open, b_close] = getBrackets(bracket_type);
    let brackets = 0;

    for(let i = start - 1; i < str.length; i++) {
        if(str[i] === b_open) {
            brackets++;
        } else if(str[i] === b_close) {
            brackets--;
            if(brackets === 0) return i;
        }
    }
    return -1;
}