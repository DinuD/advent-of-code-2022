import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    const motions = input.map((line) => {
        const [direction, distance] = line.split(" ");
        return { direction, distance: parseInt(distance) };
    });
    type Position = { x: number; y: number };
    const headPosition: Position = { x: 0, y: 0 };
    const tailPosition: Position = { x: 0, y: 0 };
    const visitedPositions: Position[] = [{ x: 0, y: 0 }];
    const alreadyVisited = ({ x, y }: Position) => {
        return visitedPositions.some(
            (position) => position.x === x && position.y === y
        );
    };
    motions.forEach((motion) => {
        switch (motion.direction) {
            case "U":
                for (let i = 0; i < motion.distance; i++) {
                    headPosition.y -= 1;
                    if (Math.abs(headPosition.y - tailPosition.y) > 1) {
                        if (headPosition.x === tailPosition.x) {
                            tailPosition.y -= 1;
                            if (
                                !alreadyVisited({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                })
                            )
                                visitedPositions.push({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                });
                        } else {
                            tailPosition.y -= 1;
                            tailPosition.x += Math.sign(
                                headPosition.x - tailPosition.x
                            );
                            if (
                                !alreadyVisited({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                })
                            )
                                visitedPositions.push({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                });
                        }
                    }
                }
                break;
            case "D":
                for (let i = 0; i < motion.distance; i++) {
                    headPosition.y += 1;
                    if (Math.abs(headPosition.y - tailPosition.y) > 1) {
                        if (headPosition.x === tailPosition.x) {
                            tailPosition.y += 1;
                            if (
                                !alreadyVisited({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                })
                            )
                                visitedPositions.push({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                });
                        } else {
                            tailPosition.y += 1;
                            tailPosition.x += Math.sign(
                                headPosition.x - tailPosition.x
                            );
                            if (
                                !alreadyVisited({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                })
                            )
                                visitedPositions.push({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                });
                        }
                    }
                }
                break;
            case "L":
                for (let i = 0; i < motion.distance; i++) {
                    headPosition.x -= 1;
                    if (Math.abs(headPosition.x - tailPosition.x) > 1) {
                        if (headPosition.y === tailPosition.y) {
                            tailPosition.x -= 1;
                            if (
                                !alreadyVisited({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                })
                            )
                                visitedPositions.push({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                });
                        } else {
                            tailPosition.x -= 1;
                            tailPosition.y += Math.sign(
                                headPosition.y - tailPosition.y
                            );
                            if (
                                !alreadyVisited({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                })
                            )
                                visitedPositions.push({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                });
                        }
                    }
                }
                break;
            case "R":
                for (let i = 0; i < motion.distance; i++) {
                    headPosition.x += 1;
                    if (Math.abs(headPosition.x - tailPosition.x) > 1) {
                        if (headPosition.y === tailPosition.y) {
                            tailPosition.x += 1;
                            if (
                                !alreadyVisited({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                })
                            )
                                visitedPositions.push({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                });
                        } else {
                            tailPosition.x += 1;
                            tailPosition.y += Math.sign(
                                headPosition.y - tailPosition.y
                            );
                            if (
                                !alreadyVisited({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                })
                            )
                                visitedPositions.push({
                                    x: tailPosition.x,
                                    y: tailPosition.y,
                                });
                        }
                    }
                }
                break;
        }
    });
    return visitedPositions.length;
}

function part2(input: string[]): number {
    const motions = input.map((line) => {
        const [direction, distance] = line.split(" ");
        return { direction, distance: parseInt(distance) };
    });
    type Position = { x: number; y: number };
    const ropePositions = new Array<Position>(10);
    for (let i = 0; i < ropePositions.length; i++) {
        ropePositions[i] = { x: 0, y: 0 };
    }
    const visitedPositions: Position[] = [{ x: 0, y: 0 }];
    const alreadyVisited = ({ x, y }: Position) => {
        return visitedPositions.some(
            (position) => position.x === x && position.y === y
        );
    };

    const verticalCheck = (i: number, j: number) => {
        if (Math.abs(ropePositions[i].y - ropePositions[j].y) > 1) {
            if (ropePositions[i].x === ropePositions[j].x) {
                ropePositions[j].y += Math.sign(
                    ropePositions[i].y - ropePositions[j].y
                );
                if (
                    !alreadyVisited({
                        x: ropePositions[j].x,
                        y: ropePositions[j].y,
                    }) &&
                    j === 9
                )
                    visitedPositions.push({
                        x: ropePositions[j].x,
                        y: ropePositions[j].y,
                    });
            } else {
                ropePositions[j].y += Math.sign(
                    ropePositions[i].y - ropePositions[j].y
                );
                ropePositions[j].x += Math.sign(
                    ropePositions[i].x - ropePositions[j].x
                );
                if (
                    !alreadyVisited({
                        x: ropePositions[j].x,
                        y: ropePositions[j].y,
                    }) &&
                    j === 9
                )
                    visitedPositions.push({
                        x: ropePositions[j].x,
                        y: ropePositions[j].y,
                    });
            }
        }
    };

    const horizontalCheck = (i: number, j: number) => {
        if (Math.abs(ropePositions[j - 1].x - ropePositions[j].x) > 1) {
            if (ropePositions[j - 1].y === ropePositions[j].y) {
                ropePositions[j].x += Math.sign(
                    ropePositions[i].x - ropePositions[j].x
                );
                if (
                    !alreadyVisited({
                        x: ropePositions[j].x,
                        y: ropePositions[j].y,
                    }) &&
                    j === 9
                )
                    visitedPositions.push({
                        x: ropePositions[j].x,
                        y: ropePositions[j].y,
                    });
            } else {
                ropePositions[j].x += Math.sign(
                    ropePositions[i].x - ropePositions[j].x
                );
                ropePositions[j].y += Math.sign(
                    ropePositions[j - 1].y - ropePositions[j].y
                );
                if (
                    !alreadyVisited({
                        x: ropePositions[j].x,
                        y: ropePositions[j].y,
                    }) &&
                    j === 9
                )
                    visitedPositions.push({
                        x: ropePositions[j].x,
                        y: ropePositions[j].y,
                    });
            }
        }
    };

    motions.forEach((motion) => {
        switch (motion.direction) {
            case "U":
                for (let i = 0; i < motion.distance; i++) {
                    ropePositions[0].y -= 1;
                    for (let j = 1; j < ropePositions.length; j++) {
                        verticalCheck(j - 1, j);
                        horizontalCheck(j - 1, j);
                    }
                }
                break;
            case "D":
                for (let i = 0; i < motion.distance; i++) {
                    ropePositions[0].y += 1;
                    for (let j = 1; j < ropePositions.length; j++) {
                        verticalCheck(j - 1, j);
                        horizontalCheck(j - 1, j);
                    }
                }
                break;
            case "L":
                for (let i = 0; i < motion.distance; i++) {
                    ropePositions[0].x -= 1;
                    for (let j = 1; j < ropePositions.length; j++) {
                        horizontalCheck(j - 1, j);
                        verticalCheck(j - 1, j);
                    }
                }
                break;
            case "R":
                for (let i = 0; i < motion.distance; i++) {
                    ropePositions[0].x += 1;
                    for (let j = 1; j < ropePositions.length; j++) {
                        horizontalCheck(j - 1, j);
                        verticalCheck(j - 1, j);
                    }
                }
                break;
        }
    });
    return visitedPositions.length;
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n");
const example2 = (await Deno.readTextFile("example2.txt")).split("\r\n");

assertEquals(part1(example), 13);
console.log(part1(input));
assertEquals(part2(example), 1);
assertEquals(part2(example2), 36);
console.log(part2(input));
