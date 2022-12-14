import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    type Point = {
        x: number;
        y: number;
    };
    const paths: Point[][] = [];
    input.forEach((line) => {
        const path: Point[] = line.split(" -> ").map((p) => {
            const [x, y] = p.split(",");
            return { x: parseInt(x), y: parseInt(y) };
        });
        paths.push(path);
    });

    let bottomRow = 0;
    for (const path of paths) {
        for (const p of path) {
            if (p.y > bottomRow) {
                bottomRow = p.y;
            }
        }
    }

    const isRock = (p: Point) => {
        for (const path of paths) {
            for (let i = 0; i < path.length - 1; i++) {
                const p1 = path[i];
                const p2 = path[i + 1];
                if (p1.x === p2.x) {
                    if (
                        p.x === p1.x &&
                        ((p.y >= p1.y && p.y <= p2.y) ||
                            (p.y <= p1.y && p.y >= p2.y))
                    ) {
                        return true;
                    }
                } else {
                    if (
                        p.y === p1.y &&
                        ((p.x >= p1.x && p.x <= p2.x) ||
                            (p.x <= p1.x && p.x >= p2.x))
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const sand: Point[] = [];

    const dropSand = (source: Point): Point => {
        let { x, y } = source;
        if (y >= bottomRow) return { x: -1, y: -1 };
        while (
            !isRock({ x, y: y + 1 }) &&
            !sand.some((p) => p.x === x && p.y === y + 1) &&
            y < bottomRow
        )
            y++;
        if (y === bottomRow) return { x: -1, y: -1 };
        if (
            !isRock({ x: x - 1, y: y + 1 }) &&
            !sand.some((p) => p.x === x - 1 && p.y === y + 1)
        ) {
            return dropSand({ x: x - 1, y: y + 1 });
        }
        if (
            !isRock({ x: x + 1, y: y + 1 }) &&
            !sand.some((p) => p.x === x + 1 && p.y === y + 1)
        ) {
            return dropSand({ x: x + 1, y: y + 1 });
        }
        return { x, y };
    };

    do {
        const newSand = dropSand({ x: 500, y: 0 });
        sand.push(newSand);
    } while (sand[sand.length - 1].x !== -1 && sand[sand.length - 1].y !== -1);
    return sand.length - 1;
}

// is pretty show, could be improved
function part2(input: string[]): number {
    type Point = {
        x: number;
        y: number;
    };
    const paths: Point[][] = [];
    input.forEach((line) => {
        const path: Point[] = line.split(" -> ").map((p) => {
            const [x, y] = p.split(",");
            return { x: parseInt(x), y: parseInt(y) };
        });
        paths.push(path);
    });

    let bottomRow = 0;
    for (const path of paths) {
        for (const p of path) {
            if (p.y > bottomRow) {
                bottomRow = p.y;
            }
        }
    }
    bottomRow += 2;

    const isRock = (p: Point) => {
        for (const path of paths) {
            for (let i = 0; i < path.length - 1; i++) {
                const p1 = path[i];
                const p2 = path[i + 1];
                if (p1.x === p2.x) {
                    if (
                        p.x === p1.x &&
                        ((p.y >= p1.y && p.y <= p2.y) ||
                            (p.y <= p1.y && p.y >= p2.y))
                    ) {
                        return true;
                    }
                } else {
                    if (
                        p.y === p1.y &&
                        ((p.x >= p1.x && p.x <= p2.x) ||
                            (p.x <= p1.x && p.x >= p2.x))
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const sand: Point[] = [];

    const dropSand = (source: Point): Point => {
        let { x, y } = source;
        if (y === bottomRow) return { x, y: y-1 };
        while (
            !isRock({ x, y: y + 1 }) &&
            !sand.some((p) => p.x === x && p.y === y + 1) &&
            y < bottomRow
        )
            y++;
        if (y === bottomRow) return { x, y: y-1 };
        if (
            !isRock({ x: x - 1, y: y + 1 }) &&
            !sand.some((p) => p.x === x - 1 && p.y === y + 1)
        ) {
            return dropSand({ x: x - 1, y: y + 1 });
        }
        if (
            !isRock({ x: x + 1, y: y + 1 }) &&
            !sand.some((p) => p.x === x + 1 && p.y === y + 1)
        ) {
            return dropSand({ x: x + 1, y: y + 1 });
        }
        return { x, y };
    };

    do {
        const newSand = dropSand({ x: 500, y: 0 });
        sand.push(newSand);
    } while (sand[sand.length - 1].x !== 500 || sand[sand.length - 1].y !== 0);
    console.log(sand);
    return sand.length;
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n");

assertEquals(part1(example), 24);
console.log(part1(input));
assertEquals(part2(example), 93);
console.log(part2(input));
