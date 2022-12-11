import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    type Monkey = {
        items: number[];
        operation: (old: number) => number;
        test: (item: number) => boolean;
        monkeyTrue: number;
        monkeyFalse: number;
        inspections: number;
    };
    const monkeys: Monkey[] = [];
    input.forEach((monkey) => {
        const lines = monkey.split("\r\n");
        const monkeyItems = lines[1]
            .split(" ")
            .slice(4)
            .map((item) => parseInt(item));
        const regexp = /(?:\s+)Operation: new = old ([\+\*]) ([0-9]+|old)/g;
        const [[_, operand, operator]] = lines[2].matchAll(regexp);
        let monkeyOperation: (old: number) => number = (old) => old;
        switch (operand) {
            case "+":
                if (operator === "old") {
                    monkeyOperation = (old) => old + old;
                } else {
                    monkeyOperation = (old) => old + parseInt(operator);
                }
                break;
            case "*":
                if (operator === "old") {
                    monkeyOperation = (old) => old * old;
                } else {
                    monkeyOperation = (old) => old * parseInt(operator);
                }
                break;
        }
        const test = lines[3].split(" ");
        const monkeyTest = (item: number) =>
            item % parseInt(test[test.length - 1]) === 0;
        const monkeyTrue = parseInt(lines[4].split(" ").slice(9)[0]);
        const monkeyFalse = parseInt(lines[5].split(" ").slice(9)[0]);
        monkeys.push({
            items: monkeyItems,
            operation: monkeyOperation,
            test: monkeyTest,
            monkeyTrue,
            monkeyFalse,
            inspections: 0,
        });
    });

    for (let i = 0; i < 20; i++) {
        monkeys.forEach((monkey) => {
            for (let j = 0; j < monkey.items.length; j++) {
                monkey.inspections++;
                monkey.items[j] = Math.floor(
                    monkey.operation(monkey.items[j]) / 3
                );
                if (monkey.test(monkey.items[j])) {
                    monkeys[monkey.monkeyTrue].items.push(monkey.items[j]);
                } else {
                    monkeys[monkey.monkeyFalse].items.push(monkey.items[j]);
                }
            }
            monkey.items = [];
        });
    }
    monkeys.sort((a, b) => b.inspections - a.inspections);
    return monkeys[0].inspections * monkeys[1].inspections;
}

function part2(input: string[]): number {
    type Monkey = {
        items: number[];
        operation: (old: number) => number;
        test: (item: number) => boolean;
        divisor: number;
        monkeyTrue: number;
        monkeyFalse: number;
        inspections: number;
    };
    const monkeys: Monkey[] = [];
    input.forEach((monkey) => {
        const lines = monkey.split("\r\n");
        const monkeyItems = lines[1]
            .split(" ")
            .slice(4)
            .map((item) => parseInt(item));
        const regexp = /(?:\s+)Operation: new = old ([\+\*]) ([0-9]+|old)/g;
        const [[_, operand, operator]] = lines[2].matchAll(regexp);
        let monkeyOperation: (old: number) => number = (old) => old;
        switch (operand) {
            case "+":
                if (operator === "old") {
                    monkeyOperation = (old) => old + old;
                } else {
                    monkeyOperation = (old) => old + parseInt(operator);
                }
                break;
            case "*":
                if (operator === "old") {
                    monkeyOperation = (old) => old * old;
                } else {
                    monkeyOperation = (old) => old * parseInt(operator);
                }
                break;
        }
        const test = lines[3].split(" ");
        const monkeyTest = (item: number) =>
            item % parseInt(test[test.length - 1]) === 0;
        const monkeyTrue = parseInt(lines[4].split(" ").slice(9)[0]);
        const monkeyFalse = parseInt(lines[5].split(" ").slice(9)[0]);
        monkeys.push({
            items: monkeyItems,
            operation: monkeyOperation,
            test: monkeyTest,
            divisor: parseInt(test[test.length - 1]),
            monkeyTrue,
            monkeyFalse,
            inspections: 0,
        });
    });

    // A good way to reduce worry levels is to mod
    // operations by the product of all divisors
    // https://en.wikipedia.org/wiki/Congruence_relation
    const divisorProduct = monkeys.reduce(
        (acc, monkey) => acc * monkey.divisor,
        1
    );

    for (let i = 0; i < 10000; i++) {
        monkeys.forEach((monkey) => {
            for (let j = 0; j < monkey.items.length; j++) {
                monkey.inspections++;
                monkey.items[j] =
                    monkey.operation(monkey.items[j]) % divisorProduct;
                if (monkey.test(monkey.items[j])) {
                    monkeys[monkey.monkeyTrue].items.push(monkey.items[j]);
                } else {
                    monkeys[monkey.monkeyFalse].items.push(monkey.items[j]);
                }
            }
            monkey.items = [];
        });
    }
    monkeys.sort((a, b) => b.inspections - a.inspections);
    return monkeys[0].inspections * monkeys[1].inspections;
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n\r\n");

assertEquals(part1(example), 10605);
console.log(part1(input));
assertEquals(part2(example), 2713310158);
console.log(part2(input));
