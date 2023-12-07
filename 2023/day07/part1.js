const fs = require('node:fs');

const NUM_VALUES = {
    "A": 13,
    "K": 12,
    "Q": 11,
    "J": 10,
    "T": 9,
    "9": 8,
    "8": 7,
    "7": 6,
    "6": 5,
    "5": 4,
    "4": 3,
    "3": 2, 
    "2": 1
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split("\n");
    let hands = lines.map(l => mapHand(l));

    hands.sort((a, b) => {
        let patternResult = Number(b.pattern) - Number(a.pattern);
        if (patternResult != 0) {
            return patternResult;
        }

        for (let i=0; i<5; i++) {
            let cardResult = NUM_VALUES[b.hand.charAt(i)]-NUM_VALUES[a.hand.charAt(i)];
            if (cardResult != 0) {
                return cardResult;
            }
        }

        return 0;
    });

    let total = 0;
    for (let i=0; i<hands.length; i++) {

        total += hands[i].bid*(hands.length-i);
    }

    console.log("total: " + total);
});

function mapHand(line) {
    let parts = line.split(" ");
    return {
        hand: parts[0].trim(),
        bid: Number(parts[1].trim()),
        pattern: mapPattern(parts[0].trim())
    };
}

function mapPattern(hand) {
    let counts = hand.split('').reduce((count, char) => { count[char] = (count[char] > 0 ? count[char]+1 : 1); return count; }, {});
    return Object.keys(counts).map(k => counts[k]).sort((a,b) => b-a).join("").padEnd(5, "0");
}
