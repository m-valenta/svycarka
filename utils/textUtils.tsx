import * as b from "bobril"

export const breakInserter = "@br@";

export function addLineBreaks(original: string): b.IBobrilChildren{
    // TODO    
    const splits = original.split(breakInserter);
    const output: b.IBobrilChild[] = []; 

    for(let split of splits) {
        output.push(split);
        output.push(<br/>)
    }
    return output;
}