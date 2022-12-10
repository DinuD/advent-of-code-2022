import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    let cycle = 1;
    let x = 1;
    let sum = 0;
    const importantCycles = [20, 60, 100, 140, 180, 220];

    const checkCycle = (cycle: number) => {
        if (importantCycles.includes(cycle)) {
            sum += cycle * x;
            importantCycles.splice(importantCycles.indexOf(cycle), 1);
        }
    };

    input.forEach((line) => {
        const [instruction, value] = line.split(" ");
        checkCycle(cycle);
        switch (instruction) {
            case "noop":
                cycle++;
                checkCycle(cycle);
                break;
            case "addx":
                cycle++;
                checkCycle(cycle);
                cycle++;
                x += parseInt(value);
                break;
        }
    });
    return sum;
}

function part2(input: string[]): void {
    let cycle = 1;
    let x = 1;
    const crt: string[][] = [];
    for (let i = 0; i < 6; i++) {
        crt.push(new Array(40).fill(""));
    }

    const checkCycle = (cycle: number) => {
        const spritePositions = [x - 1, x, x + 1];
        const arrayCycle = (cycle - 1) % 240;
        const drawingPosition = [
            Math.floor((arrayCycle % 240) / 40),
            (arrayCycle % 240) % 40,
        ];
        if (spritePositions.includes(arrayCycle % 40)) {
            crt[drawingPosition[0]][drawingPosition[1]] = "#";
        } else {
            crt[drawingPosition[0]][drawingPosition[1]] = ".";
        }
    };

    input.forEach((line) => {
        const [instruction, value] = line.split(" ");
        checkCycle(cycle);
        switch (instruction) {
            case "noop":
                cycle++;
                break;
            case "addx":
                cycle++;
                checkCycle(cycle);
                cycle++;
                x += parseInt(value);
                break;
        }
    });

    for (let i = 0; i < 6; i++) {
        console.log(crt[i].join(""));
    }
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n");

assertEquals(part1(example), 13140);
console.log(part1(input));
part2(example);
console.log(part2(input));
