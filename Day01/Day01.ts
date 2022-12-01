import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    let max = 0;
    let currCount = 0;
    input.forEach((calorieCount) => {
        if (calorieCount === '\r') {
            if(currCount > max)
                max = currCount;
            currCount = 0;
        } else {
            currCount += parseInt(calorieCount);
        }
    });
    if(currCount > max)
        max = currCount;
    return max;
}

function part2(input: string[]): number {
    let currCount = 0;
    const elfCalories = new Array<number>();
    input.forEach((calorieCount) => {
        if (calorieCount === '\r') {
            elfCalories.push(currCount);
            currCount = 0;
        } else {
            currCount += parseInt(calorieCount);
        }
    });
    elfCalories.sort((n1, n2) => n2-n1);
    const topThree = elfCalories.slice(0, 3);
    console.log(topThree);
    
    return topThree.reduce((acc, curr) => acc+curr, 0);
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 24000);
// console.log(part1(input));
assertEquals(part1(input), 69310);
// console.log(part2(input));
assertEquals(part2(input), 206104);