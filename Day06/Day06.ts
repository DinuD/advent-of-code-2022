import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    const buffer = input[0];
    for (let i = 3; i < buffer.length; i++) {
        const set = new Set(buffer.slice(i - 3, i + 1));
        if (set.size === 4) return i + 1;
    }
    return -1;
}

function part2(input: string[]): number {
    const buffer = input[0];
    for (let i = 13; i < buffer.length; i++) {
        const set = new Set(buffer.slice(i - 13, i + 1));
        if (set.size === 14) return i + 1;
    }
    return -1;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 7);
console.log(part1(input));
assertEquals(part2(example), 19);
console.log(part2(input));
