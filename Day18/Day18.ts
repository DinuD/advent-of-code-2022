import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    type Cube = {
        x: number;
        y: number;
        z: number;
    };

    const areSharingSides = (cube1: Cube, cube2: Cube): boolean => {
        if (cube1.x === cube2.x && cube1.y === cube2.y) {
            return Math.abs(cube1.z - cube2.z) === 1;
        } else if (cube1.x === cube2.x && cube1.z === cube2.z) {
            return Math.abs(cube1.y - cube2.y) === 1;
        } else if (cube1.y === cube2.y && cube1.z === cube2.z) {
            return Math.abs(cube1.x - cube2.x) === 1;
        }
        return false;
    };

    const cubes: Cube[] = [];
    input.forEach((line) => {
        const [x, y, z] = line.split(",").map((x) => parseInt(x));
        cubes.push({ x, y, z });
    });
    let sharedSides = 0;
    for (let i = 0; i < cubes.length - 1; i++) {
        for (let j = i + 1; j < cubes.length; j++) {
            if (areSharingSides(cubes[i], cubes[j])) {
                sharedSides += 2;
            }
        }
    }
    return cubes.length * 6 - sharedSides;
}

function part2(input: string[]): number {
    type Cube = {
        x: number;
        y: number;
        z: number;
    };

    const areSharingSides = (cube1: Cube, cube2: Cube): boolean => {
        if (cube1.x === cube2.x && cube1.y === cube2.y) {
            return Math.abs(cube1.z - cube2.z) === 1;
        } else if (cube1.x === cube2.x && cube1.z === cube2.z) {
            return Math.abs(cube1.y - cube2.y) === 1;
        } else if (cube1.y === cube2.y && cube1.z === cube2.z) {
            return Math.abs(cube1.x - cube2.x) === 1;
        }
        return false;
    };

    class CubeSet extends Array<Cube> {
        add(cube: Cube) {
            if (!this.has(cube)) this.push(cube);
        }

        has(cube: Cube) {
            for (let i = 0; i < this.length; i++) {
                if (
                    this[i].x === cube.x &&
                    this[i].y === cube.y &&
                    this[i].z === cube.z
                )
                    return true;
            }
            return false;
        }
    }

    const bfs = (grid: number[][][], cube: Cube) => {
        const queue: Cube[] = [cube];
        const visited = new CubeSet();
        // visited.add(cube);

        while (queue.length > 0) {
            const current = queue.shift()!;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    for (let k = -1; k <= 1; k++) {
                        const next = {
                            x: current.x + i,
                            y: current.y + j,
                            z: current.z + k,
                        };
                        if (next.x < 0 || next.y < 0 || next.z < 0) continue;
                        if (
                            next.x >= grid.length ||
                            next.y >= grid[0].length ||
                            next.z >= grid[0][0].length
                        )
                            continue;
                        if (grid[next.x][next.y][next.z] === 0) {
                            if (!visited.has(next)) {
                                visited.add(next);
                                queue.push(next);
                            }
                        }
                    }
                }
            }
        }
        return visited;
    };

    const cubes: Cube[] = [];
    const grid: number[][][] = new Array(22).fill(0).map(() => {
        return new Array(22).fill(0).map(() => new Array(22).fill(0));
    });
    let minX = 99;
    let minY = 99;
    let minZ = 99;
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;
    input.forEach((line) => {
        const [x, y, z] = line.split(",").map((x) => parseInt(x));
        cubes.push({ x, y, z });
        grid[x][y][z] = 1;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (z < minZ) minZ = z;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        if (z > maxZ) maxZ = z;
    });
    let sharedSides = 0;
    for (let i = 0; i < cubes.length - 1; i++) {
        for (let j = i + 1; j < cubes.length; j++) {
            if (areSharingSides(cubes[i], cubes[j])) {
                sharedSides += 2;
            }
        }
    }

    // const airParticles = bfs(grid, cubes[0]).filter(
    //     (cube) =>
    //         cube.x > minX &&
    //         cube.x < maxX &&
    //         cube.y > minY &&
    //         cube.y < maxY &&
    //         cube.z > minZ &&
    //         cube.z < maxZ
    // );

    const bounding = bfs(grid, { x: 0, y: 0, z: 0 });
    const airParticles = bfs(grid, cubes[0]).filter(cube => !bounding.has(cube));

    console.log(cubes.length * 6);
    console.log(sharedSides);
    console.log(airParticles.length * 6);
    console.log(airParticles);
    console.log(bounding);

    return cubes.length * 6 - sharedSides - airParticles.length * 6;
}

const input = (await Deno.readTextFile("input.txt")).split("\n");
const example = (await Deno.readTextFile("example.txt")).split("\n");

// assertEquals(part1(example), 64);
// console.log(part1(input));
assertEquals(part2(example), 58);
console.log(part2(input));
