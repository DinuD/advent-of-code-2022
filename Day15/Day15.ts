import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

// Explanation for part 1 : https://www.youtube.com/watch?v=kV--Abrn_TI
function part1(input: string[], row: number): number {
    const sensors: { x: number; y: number; }[] = [];
    const beacons: { x: number; y: number; }[] = [];
    const distances: number[] = [];
    const regexp = /x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/g;
    input.forEach((line) => {
        const [results] = line.matchAll(regexp);
        const sensor = { x: parseInt(results[1]), y: parseInt(results[2]) };
        const beacon = { x: parseInt(results[3]), y: parseInt(results[4]) };
        sensors.push(sensor);
        beacons.push(beacon);
        distances.push(Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y));
    });
    const ranges: number[][] = [];
    sensors.forEach((sensor, index) => {
        const top = sensor.y - distances[index];
        const bottom = sensor.y + distances[index];
        const left = sensor.x - distances[index];
        const right = sensor.x + distances[index];

        if (top <= row && row <= bottom) {
            const dy = Math.abs(row - sensor.y);
            ranges.push([left + dy, right - dy]);
        }
    });

    const max = Math.max(...ranges.map((range) => range[1]));
    const min = Math.min(...ranges.map((range) => range[0]));
    return max - min;
}

// Explanation for part 2 : https://www.youtube.com/watch?v=DtnvoqZZqJ0
function part2(input: string[], maxCoord: number): number {
    for (let row = 0; row <= maxCoord; row++) {
        const sensors: { x: number; y: number }[] = [];
        const beacons: { x: number; y: number }[] = [];
        const distances: number[] = [];
        const regexp = /x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/g;
        input.forEach((line) => {
            const [results] = line.matchAll(regexp);
            const sensor = { x: parseInt(results[1]), y: parseInt(results[2]) };
            const beacon = { x: parseInt(results[3]), y: parseInt(results[4]) };
            sensors.push(sensor);
            beacons.push(beacon);
            distances.push(
                Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y)
            );
        });
        const ranges: number[][] = [];
        sensors.forEach((sensor, index) => {
            const top = sensor.y - distances[index];
            const bottom = sensor.y + distances[index];
            const left = sensor.x - distances[index];
            const right = sensor.x + distances[index];

            if (top <= row && row <= bottom) {
                const dy = Math.abs(row - sensor.y);
                ranges.push([left + dy, right - dy]);
            }
        });

        for (let i = 0; i < ranges.length; i++) {
            for (let j = 0; j < ranges.length; j++) {
                if (i === j) continue;
                if (ranges[i][1] >= ranges[j][0] && ranges[i][0] <= ranges[j][1]) {
                    const merged = [Math.min(ranges[i][0], ranges[j][0]), Math.max(ranges[i][1], ranges[j][1])];
                    ranges.splice(Math.max(i, j), 1);
                    ranges.splice(Math.min(i, j), 1);
                    ranges.push(merged);
                    i = 0;
                    j = -1;
                }
            }
        }
        if(ranges.length === 2) {
            if (Math.abs(ranges[0][0] - ranges[1][1]) === 2)
                return (Math.max(ranges[0][0], ranges[1][1]) - 1) * 4000000 + row;
            else
                return (Math.max(ranges[0][1], ranges[1][0]) - 1) * 4000000 + row;
        }
    }
    return 0;
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n");

assertEquals(part1(example, 10), 26);
console.log(part1(input, 2000000));
assertEquals(part2(example, 20), 56000011);
console.log(part2(input, 4000000));