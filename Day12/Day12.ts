import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import PriorityQueue from "npm:ts-priority-queue";

function part1(input: string[]): number {
    const grid = input.map((line) => line.split(""));
    type Position = {
        i: number;
        j: number;
    };

    const find = (value: string): Position => {
        for (let i = 0; i < grid.length; i++) {
            const j = grid[i].indexOf(value);
            if (j !== -1) return { i, j };
        }
        return { i: -1, j: -1 };
    };

    const source = find("S");
    const end = find("E");

    const dijkstra = (src: { i: number; j: number }) => {
        const distances: number[][] = [];
        for (let i = 0; i < grid.length; i++) {
            distances[i] = [];
            for (let j = 0; j < grid[0].length; j++) {
                distances[i][j] = Number.POSITIVE_INFINITY;
            }
        }
        const pq = new PriorityQueue.default({
            comparator: (a: Position, b: Position) =>
                distances[a.i][b.i] - distances[b.i][b.j],
        });

        pq.queue(src);
        distances[src.i][src.j] = 0;

        while (pq.length) {
            const current = pq.dequeue()!;
            const currentDistance = distances[current.i][current.j];

            for (const [i, j] of [
                [current.i + 1, current.j],
                [current.i - 1, current.j],
                [current.i, current.j + 1],
                [current.i, current.j - 1],
            ]) {
                if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length)
                    continue;
                const currentHeight = grid[current.i][current.j];
                const nextHeight = grid[i][j];
                const weight = () => {
                    if (currentHeight === "S") return 1;
                    if (nextHeight === "E" && currentHeight === "z") return 1;
                    if (nextHeight === "E" && currentHeight !== "z")
                        return Number.POSITIVE_INFINITY;
                    if (
                        nextHeight.charCodeAt(0) - currentHeight.charCodeAt(0) >
                        1
                    )
                        return Number.POSITIVE_INFINITY;
                    return 1;
                };
                if (distances[i][j] > currentDistance + weight()) {
                    distances[i][j] = currentDistance + weight();
                    pq.queue({ i, j });
                }
            }
        }
        return distances;
    };

    return dijkstra(source)[end.i][end.j];
}

function part2(input: string[]): number {
    const grid = input.map((line) => line.split(""));
    type Position = {
        i: number;
        j: number;
    };

    const findAll = (value: string): Position[] => {
        const positions: Position[] = [];
        for (let i = 0; i < grid.length; i++) {
            const j = grid[i].indexOf(value);
            if (j !== -1) positions.push({ i, j });
        }
        return positions;
    };

    const source = findAll("S").concat(findAll("a"));
    const end = findAll("E")[0];

    const dijkstra = (src: { i: number; j: number }) => {
        const distances: number[][] = [];
        for (let i = 0; i < grid.length; i++) {
            distances[i] = [];
            for (let j = 0; j < grid[0].length; j++) {
                distances[i][j] = Number.POSITIVE_INFINITY;
            }
        }
        const pq = new PriorityQueue.default({
            comparator: (a: Position, b: Position) =>
                distances[a.i][b.i] - distances[b.i][b.j],
        });

        pq.queue(src);
        distances[src.i][src.j] = 0;

        while (pq.length) {
            const current = pq.dequeue()!;
            const currentDistance = distances[current.i][current.j];

            for (const [i, j] of [
                [current.i + 1, current.j],
                [current.i - 1, current.j],
                [current.i, current.j + 1],
                [current.i, current.j - 1],
            ]) {
                if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length)
                    continue;
                const currentHeight = grid[current.i][current.j];
                const nextHeight = grid[i][j];
                const weight = () => {
                    if (currentHeight === "S") return 1;
                    if (nextHeight === "E" && currentHeight === "z") return 1;
                    if (nextHeight === "E" && currentHeight !== "z")
                        return Number.POSITIVE_INFINITY;
                    if (
                        nextHeight.charCodeAt(0) - currentHeight.charCodeAt(0) >
                        1
                    )
                        return Number.POSITIVE_INFINITY;
                    return 1;
                };
                if (distances[i][j] > currentDistance + weight()) {
                    distances[i][j] = currentDistance + weight();
                    pq.queue({ i, j });
                }
            }
        }
        return distances;
    };

    let minSteps = Number.POSITIVE_INFINITY;
    for (const src of source) {
        const steps = dijkstra(src)[end.i][end.j];
        if (steps < minSteps) minSteps = steps;
    }
    return minSteps;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

assertEquals(part1(example), 31);
console.log(part1(input));
assertEquals(part2(example), 29);
console.log(part2(input));
