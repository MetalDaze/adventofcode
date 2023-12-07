const fs = require('node:fs');

const NUM_VALUES = {
    "A": 13,
    "K": 12,
    "Q": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3, 
    "2": 2,
    "J": 1,
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split("\n");
    let hands = lines.map(l => mapHand(l));

    hands.sort((a, b) => {
        let patternResult = b.pattern - a.pattern;
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
    let strHand = parts[0].trim();
    let pattern = null;
    if (strHand.indexOf("J") > -1 && strHand.replaceAll('J', '') != '') {
        pattern = strHand.split('').filter(c => c != 'J').map(c => strHand.replaceAll('J', c)).map(p => { return { pattern: p, value: patternAsValue(p) } })
            .sort((a,b) => b.value-a.value)[0].value;
    } else {
        pattern = patternAsValue(strHand);
    }
    
    return {
        hand: strHand,
        bid: Number(parts[1].trim()),
        pattern: pattern
    };
}

function patternAsValue(hand) {
    let counts = hand.split('').reduce((count, char) => { count[char] = (count[char] > 0 ? count[char]+1 : 1); return count; }, {});
    return Number(Object.keys(counts).map(k => counts[k]).sort((a,b) => b-a).join("").padEnd(5, "0"));
}