import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    let fullyContaintedPairs = 0;
    type SectionRange = {
        lower: number,
        upper: number
    };
    input.forEach((pair) => {
        const [ elf1, elf2 ] = pair.split(",")
        const range1: SectionRange = {
            lower: parseInt(elf1.split("-")[0]),
            upper: parseInt(elf1.split("-")[1])
        }
        const range2: SectionRange = {
            lower: parseInt(elf2.split("-")[0]),
            upper: parseInt(elf2.split("-")[1])
        }
        if (range1.lower >= range2.lower && range1.upper <= range2.upper) {
            fullyContaintedPairs++;
        } else if(range1.lower <= range2.lower && range1.upper >= range2.upper) {
            fullyContaintedPairs++;
        }
    });

    return fullyContaintedPairs;
}

function part2(input: string[]): number {
    let overlappingPairs = 0;
    type SectionRange = {
        lower: number,
        upper: number
    };
    input.forEach((pair) => {
        const [ elf1, elf2 ] = pair.split(",")
        const range1: SectionRange = {
            lower: parseInt(elf1.split("-")[0]),
            upper: parseInt(elf1.split("-")[1])
        }
        const range2: SectionRange = {
            lower: parseInt(elf2.split("-")[0]),
            upper: parseInt(elf2.split("-")[1])
        }
        const checkOverlap = (r1: SectionRange, r2: SectionRange) => {
            if(r1.lower <= r2.lower && r2.lower <= r1.upper)
                return true;
            return false;
        }
        
        if(checkOverlap(range1, range2))
            overlappingPairs++;
        else if(checkOverlap(range2, range1))
            overlappingPairs++;
    });

    return overlappingPairs;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 2);
console.log(part1(input));
assertEquals(part2(example), 4);
console.log(part2(input));