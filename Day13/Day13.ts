import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    let sum = 0;

    type ValueOrList = string | ValueOrList[];
    type PacketList = ValueOrList;

    const createList = (packet: string) => {
        const list: PacketList = [];
        for (let i = 0; i < packet.length; i++) {
            if (packet[i] === "[") {
                const stack: string[] = [];
                for (let j = i + 1; j < packet.length; j++) {
                    if (packet[j] === "[") {
                        stack.push("[");
                        continue;
                    }
                    if (packet[j] === "]") {
                        if (stack.length > 0) {
                            stack.pop();
                            continue;
                        }
                        list.push(createList(packet.slice(i + 1, j)));
                        i = j + 1;
                        break;
                    }
                }
            } else if (packet[i] !== ",") {
                let j = i + 1;
                while (
                    packet[j] !== "," &&
                    packet[j] !== "]" &&
                    j < packet.length
                )
                    j++;
                list.push(packet.slice(i, j));
                i = j;
            }
        }
        return list;
    };

    const makeArray = (x: PacketList) => {
        return typeof x === "string" ? [x] : x;
    };

    const compareLists = (
        list1: PacketList,
        list2: PacketList
    ): boolean | undefined => {
        if (Array.isArray(list1) && Array.isArray(list2)) {
            let i = 0;
            while (i < list1.length && i < list2.length) {
                const result = compareLists(list1[i], list2[i]);
                if (result !== undefined) return result;
                i++;
            }
            if (list1.length > list2.length) return false;
            if (list1.length < list2.length) return true;
            return undefined;
        } else if (typeof list1 === "string" && typeof list2 === "string") {
            const left = parseInt(list1);
            const right = parseInt(list2);
            if (left < right) return true;
            if (left > right) return false;
            return undefined;
        } else {
            return compareLists(makeArray(list1), makeArray(list2));
        }
    };
    input.forEach((pair, index) => {
        const packets = pair.split("\r\n").map((packet) => packet.slice(1, -1));
        const packetLists = packets.map((packet) => createList(packet));
        if (compareLists(packetLists[0], packetLists[1])) sum += index + 1;
    });
    return sum;
}

function part2(input: string[]): number {
    type ValueOrList = string | ValueOrList[];
    type PacketList = ValueOrList;

    const createList = (packet: string) => {
        const list: PacketList = [];
        for (let i = 0; i < packet.length; i++) {
            if (packet[i] === "[") {
                const stack: string[] = [];
                for (let j = i + 1; j < packet.length; j++) {
                    if (packet[j] === "[") {
                        stack.push("[");
                        continue;
                    }
                    if (packet[j] === "]") {
                        if (stack.length > 0) {
                            stack.pop();
                            continue;
                        }
                        list.push(createList(packet.slice(i + 1, j)));
                        i = j + 1;
                        break;
                    }
                }
            } else if (packet[i] !== ",") {
                let j = i + 1;
                while (
                    packet[j] !== "," &&
                    packet[j] !== "]" &&
                    j < packet.length
                )
                    j++;
                list.push(packet.slice(i, j));
                i = j;
            }
        }
        return list;
    };

    const makeArray = (x: PacketList) => {
        return typeof x === "string" ? [x] : x;
    };

    const compareLists = (
        list1: PacketList,
        list2: PacketList
    ): boolean | undefined => {
        if (Array.isArray(list1) && Array.isArray(list2)) {
            let i = 0;
            while (i < list1.length && i < list2.length) {
                const result = compareLists(list1[i], list2[i]);
                if (result !== undefined) return result;
                i++;
            }
            if (list1.length > list2.length) return false;
            if (list1.length < list2.length) return true;
            return undefined;
        } else if (typeof list1 === "string" && typeof list2 === "string") {
            const left = parseInt(list1);
            const right = parseInt(list2);
            if (left < right) return true;
            if (left > right) return false;
            return undefined;
        } else {
            return compareLists(makeArray(list1), makeArray(list2));
        }
    };

    const packetToString = (packet: PacketList): string => {
        if (Array.isArray(packet)) {
            return `[${packet.map(packetToString).join(",")}]`;
        } else {
            return packet;
        }
    };

    const find = (divider: PacketList, packets: PacketList) => {
        const dividerString = packetToString(divider);
        for (let i = 0; i < packets.length; i++) {
            if (packetToString(packets[i]) === dividerString) return i;
        }
        return -1;
    };
    
    const packets: PacketList[] = [];
    input.forEach((line) => {
        if (line !== "") packets.push(createList(line));
    });
    packets.push([["2"]]);
    packets.push([["6"]]);
    for (const packet of packets) {
        console.log(packetToString(packet));
    }
    packets.sort((a, b) => {
        const result = compareLists(a, b);
        if (result === undefined) return 0;
        return result ? -1 : 1;
    });
    return (find([["2"]], packets) + 1) * (find([["6"]], packets) + 1);
}

// const input = (await Deno.readTextFile("input.txt")).split("\r\n\r\n");
// const example = (await Deno.readTextFile("example.txt")).split("\r\n\r\n");
const input = (await Deno.readTextFile("input.txt")).split("\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n");

// assertEquals(part1(example), 13);
// console.log(part1(input));
assertEquals(part2(example), 140);
console.log(part2(input));
