import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    type Node = {
        name: string;
        size: number;
        children: Node[];
        parent?: Node;
    };
    // build fs tree
    const root: Node = {
        name: "/",
        size: 0,
        children: [],
    };
    let currNode = root;
    input.forEach((line, index) => {
        if (index === 0) return;
        if (line.charAt(0) === "$") {
            const regexp = /\$ (cd|ls)(?: (.*))?$/g;
            const [command] = line.matchAll(regexp);

            if (command[1] === "cd") {
                if (command[2] === "..") {
                    // go up
                    currNode = currNode.parent!;
                } else {
                    // go down
                    if (
                        currNode.children.some(
                            ({ name }) => name === command[2]
                        )
                    ) {
                        const index = currNode.children.findIndex(
                            ({ name }) => name === command[2]
                        );
                        currNode = currNode.children[index];
                    } else {
                        const newNode: Node = {
                            name: command[2],
                            size: 0,
                            children: [],
                            parent: currNode,
                        };
                        currNode.children.push(newNode);
                        currNode = newNode;
                    }
                }
            } else if (command[1] === "ls") {
                // list files
            }
        } else {
            const file = line.split(" ");
            currNode.children.push({
                name: file[1],
                size: file[0] === "dir" ? 0 : parseInt(file[0]),
                children: [],
                parent: currNode,
            });
        }
    });

    let sum = 0;

    // calculate sizes
    const calcSize = (node: Node): number => {
        if (node.children.length === 0) return node.size;
        let size = node.size;
        node.children.forEach((child) => {
            size += calcSize(child);
        });
        if (size <= 100000) sum += size;
        return size;
    };

    calcSize(root);
    return sum;
}

function part2(input: string[]): number {
    type Node = {
        name: string;
        size: number;
        children: Node[];
        parent?: Node;
    };
    // build fs tree
    const root: Node = {
        name: "/",
        size: 0,
        children: [],
    };
    let currNode = root;
    input.forEach((line, index) => {
        if (index === 0) return;
        if (line.charAt(0) === "$") {
            const regexp = /\$ (cd|ls)(?: (.*))?$/g;
            const [command] = line.matchAll(regexp);

            if (command[1] === "cd") {
                if (command[2] === "..") {
                    // go up
                    currNode = currNode.parent!;
                } else {
                    // go down
                    if (
                        currNode.children.some(
                            ({ name }) => name === command[2]
                        )
                    ) {
                        const index = currNode.children.findIndex(
                            ({ name }) => name === command[2]
                        );
                        currNode = currNode.children[index];
                    } else {
                        const newNode: Node = {
                            name: command[2],
                            size: 0,
                            children: [],
                            parent: currNode,
                        };
                        currNode.children.push(newNode);
                        currNode = newNode;
                    }
                }
            } else if (command[1] === "ls") {
                // list files
            }
        } else {
            const file = line.split(" ");
            currNode.children.push({
                name: file[1],
                size: file[0] === "dir" ? 0 : parseInt(file[0]),
                children: [],
                parent: currNode,
            });
        }
    });

    const directories: { node: Node; size: number }[] = [];

    // calculate sizes
    const calcSize = (node: Node): number => {
        if (node.children.length === 0) return node.size;
        let size = node.size;
        node.children.forEach((child) => {
            size += calcSize(child);
        });
        directories.push({ node, size });
        return size;
    };

    const used = calcSize(root);
    const free = 70000000 - used;
    const toDelete = 30000000 - free;

    directories.sort((a, b) => a.size - b.size);
    for (let i = 0; i < directories.length; i++) {
        const { size } = directories[i];
        if (size >= toDelete) {
            return size;
        }
    }
    return 0;
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n");

assertEquals(part1(example), 95437);
console.log(part1(input));
assertEquals(part2(example), 24933642);
console.log(part2(input));
