import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    const grid: number[][] = [];
    input.forEach((line) => {
        grid.push(line.split("").map((c) => parseInt(c)));
    });

    const visibleLeft = (i: number, j: number) => {
        for (let k = j - 1; k >= 0; k--) {
            if (grid[i][k] >= grid[i][j]) return false;
        }
        return true;
    };

    const visibleRight = (i: number, j: number) => {
        for (let k = j + 1; k < grid[i].length; k++) {
            if (grid[i][k] >= grid[i][j]) return false;
        }
        return true;
    };

    const visibleTop = (i: number, j: number) => {
        for (let k = i - 1; k >= 0; k--) {
            if (grid[k][j] >= grid[i][j]) return false;
        }
        return true;
    };

    const visibleBottom = (i: number, j: number) => {
        for (let k = i + 1; k < grid.length; k++) {
            if (grid[k][j] >= grid[i][j]) return false;
        }
        return true;
    };

    let visible = (grid.length + grid[0].length - 1) * 2 - 2;

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            if (visibleLeft(i, j)) {
                visible++;
            } else if (visibleRight(i, j)) {
                visible++;
            } else if (visibleTop(i, j)) {
                visible++;
            } else if (visibleBottom(i, j)) {
                visible++;
            }
        }
    }
    return visible;
}

function part2(input: string[]): number {
    const grid: number[][] = [];
    input.forEach((line) => {
        grid.push(line.split("").map((c) => parseInt(c)));
    });

    const treesLeft = (i: number, j: number) => {
        let trees = 1;
        for (let k = j - 1; k >= 0; k--) {
            if (grid[i][k] >= grid[i][j]) return trees;
            trees++;
        }
        return trees-1;
    };

    const treesRight = (i: number, j: number) => {
        let trees = 1;
        for (let k = j + 1; k < grid[i].length; k++) {
            if (grid[i][k] >= grid[i][j]) return trees;
            trees++;
        }
        return trees-1;
    };

    const treesTop = (i: number, j: number) => {
        let trees = 1;
        for (let k = i - 1; k >= 0; k--) {
            if (grid[k][j] >= grid[i][j]) return trees;
            trees++;
        }
        return trees-1;
    };

    const treesBottom = (i: number, j: number) => {
        let trees = 1;
        for (let k = i + 1; k < grid.length; k++) {
            if (grid[k][j] >= grid[i][j]) return trees;
            trees++;
        }
        return trees-1;
    };

    let max = 0;

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            const score =
                treesLeft(i, j) *
                treesRight(i, j) *
                treesBottom(i, j) *
                treesTop(i, j);
            if (score > max) max = score;
        }
    }
    return max;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 21);
console.log(part1(input));
assertEquals(part2(example), 8);
console.log(part2(input));
