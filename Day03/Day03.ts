import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    let sum = 0;
    input.forEach((rucksack) => {
        const compartments = [rucksack.slice(0, rucksack.length/2), rucksack.slice(rucksack.length/2)];

        for(let i = 0; i < 26; i++) {
            let c = String.fromCharCode(97+i);
            if(compartments[0].includes(c) && compartments[1].includes(c)) {
                sum += i+1;
                break;
            }
            c = String.fromCharCode(65+i);
            if(compartments[0].includes(c) && compartments[1].includes(c)) {
                sum += 27+i;
                break;
            }
        }
    });
    return sum;
}

function part2(input: string[]): number {
    let sum = 0;
    for(let i = 0; i < input.length; i += 3) {
        for(let n = 0; n < 26; n++) {
            let c = String.fromCharCode(97+n);
            if(input[i].includes(c) && input[i+1].includes(c) && input[i+2].includes(c)) {
                sum += n+1;
                break;
            }
            c = String.fromCharCode(65+n);
            if(input[i].includes(c) && input[i+1].includes(c) && input[i+2].includes(c)) {
                sum += 27+n;
                break;
            }
        }
    }
    return sum;
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n");

assertEquals(part1(example), 157);
console.log(part1(input));
assertEquals(part2(example), 70);
console.log(part2(input));