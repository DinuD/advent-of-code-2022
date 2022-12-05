import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): string {
    const drawingLines = input[0].split("\r\n");
    const moves = input[1].split("\r\n");

    const stackNumbers = drawingLines[drawingLines.length - 1]
        .trim()
        .split("   ")
        .map((stack) => parseInt(stack));
    const stacks = new Array<string[]>();
    stackNumbers.forEach((item) => {
        stacks.push([]);
    });
    for (let i = drawingLines.length - 2; i >= 0; i--) {
        const line = drawingLines[i].replaceAll("    ", " ").split(" ");
        for (let j = 0; j < line.length; j++)
            if (line[j] !== "") {
                stacks[j].push(line[j].charAt(1));
            }
    }
    moves.forEach((move, index) => {
        const regexp = /move (\d+) from (\d+) to (\d+)/g;
        const [values] = [...move.matchAll(regexp)];
        const containerCount = parseInt(values[1]);
        const fromStack = parseInt(values[2]);
        const toStack = parseInt(values[3]);

        for (let i = 0; i < containerCount; i++) {
            const container = stacks[fromStack - 1].pop();
            if (container) stacks[toStack - 1].push(container);
        }
    });
    const topOfStacks = stacks.map((stack) => stack[stack.length - 1]).join("");
    return topOfStacks;
}

function part2(input: string[]): string {
    const drawingLines = input[0].split("\r\n");
    const moves = input[1].split("\r\n");

    const stackNumbers = drawingLines[drawingLines.length - 1]
        .trim()
        .split("   ")
        .map((stack) => parseInt(stack));
    const stacks = new Array<string[]>();
    stackNumbers.forEach((item) => {
        stacks.push([]);
    });
    for (let i = drawingLines.length - 2; i >= 0; i--) {
        const line = drawingLines[i].replaceAll("    ", " ").split(" ");
        for (let j = 0; j < line.length; j++)
            if (line[j] !== "") {
                stacks[j].push(line[j].charAt(1));
            }
    }
    moves.forEach((move, index) => {
        const regexp = /move (\d+) from (\d+) to (\d+)/g;
        const [values] = [...move.matchAll(regexp)];
        const containerCount = parseInt(values[1]);
        const fromStack = parseInt(values[2]);
        const toStack = parseInt(values[3]);

        if (containerCount == 1) {
            const container = stacks[fromStack - 1].pop();
            if (container) stacks[toStack - 1].push(container);
        } else {
            const containers = stacks[fromStack - 1].splice(
                stacks[fromStack - 1].length - containerCount,
                containerCount
            );
            stacks[toStack - 1].push(...containers);
        }
    });
    const topOfStacks = stacks.map((stack) => stack[stack.length - 1]).join("");
    return topOfStacks;
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n\r\n");

assertEquals(part1(example), "CMZ");
console.log(part1(input));
assertEquals(part2(example), "MCD");
console.log(part2(input));
