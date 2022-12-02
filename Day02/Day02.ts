import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

function part1(input: string[]): number {
    /*
    A - Rock (1pt)
    B - Paper (2pt)
    C - Scissors (3pt)
    X - Rock
    Y - Paper
    Z - Scissors
    Outcome scores: lose (0pt), draw (3pt), win(6pt)
    */
    let totalPoints = 0;
    const shapePoints: { [key: string]:number } = {"X": 1, "Y": 2, "Z": 3}
    const outcomePoints: { [key: string]:number } = {
        "A X": 3,
        "A Y": 6,
        "A Z": 0,
        "B X": 0,
        "B Y": 3,
        "B Z": 6,
        "C X": 6,
        "C Y": 0,
        "C Z": 3
    }
    const rounds = input.map(round => round.split(" "));
    rounds.forEach(round => {
        totalPoints += shapePoints[round[1]] + outcomePoints[round[0] + " " + round[1]];
    });
    return totalPoints;
}

function part2(input: string[]): number {
    /*
    A - Rock (1pt)
    B - Paper (2pt)
    C - Scissors (3pt)
    X - Lose
    Y - Draw
    Z - Win
    Outcome scores: lose (0pt), draw (3pt), win(6pt)
    */
    let totalPoints = 0;
    const shapePoints: { [key: string]:number } = {"A": 1, "B": 2, "C": 3}
    const winningMove: { [key: string]:string } = {
        "A": "B",
        "B": "C",
        "C": "A",
    }
    const rounds = input.map(round => round.split(" "));
    rounds.forEach(round => {
        // console.log(round, totalPoints, shapePoints[round[1]], outcomePoints[round[0] + " " + round[1]]);
        const options = ["A", "B", "C"]
        let result: string;
        switch (round[1]) {
            case 'X':
                result = options.filter(input => input !== winningMove[round[0]] && input !== round[0])[0];
                totalPoints += shapePoints[result];
                break;
            
            case 'Y':
                totalPoints += 3 + shapePoints[round[0]];
                break;

            case 'Z':
                totalPoints += 6 + shapePoints[winningMove[round[0]]];
                break;

            default:
                break;
        }
    });
    return totalPoints;
}

const input = (await Deno.readTextFile("input.txt")).split("\r\n");
const example = (await Deno.readTextFile("example.txt")).split("\r\n");

assertEquals(part1(example), 15);
console.log(part1(input));
assertEquals(part2(example), 12);
console.log(part2(input));