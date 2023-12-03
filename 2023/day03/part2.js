const fs = require('node:fs');
const { workerData } = require('node:worker_threads');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split("\n");

    let symbols = [];
    let prevChar = ".";
    let currentNumStr = "";
    let currentStartIdx = { row: -1, col: -1};
    for (let row=0; row<lines.length; row++) {
        for (let col=0; col<lines[0].length; col++) {
            let currChar = lines[row][col];
            if (isNumeric(currChar)) {
                currentNumStr += currChar;
                if (!isNumeric(prevChar)) {
                    // new number starts
                    currentStartIdx = { row: row, col: col };
                }
            }
            if (!isNumeric(currChar) || (row==lines.length-1 && col==lines[0].length-1)) {
                if (currentNumStr.length>0) {
                    // Houston, we have a number
                    let adjSymbols = getAdjacentSymbols(lines, currentStartIdx, currentNumStr);
                    if (adjSymbols && adjSymbols.length > 0) {
                        adjSymbols.forEach(as => {
                            let found = symbols.find(s => s.row == as.row && s.col == as.col);
                            if (!found) {
                                found = as;
                                symbols.push(found);
                            }
                            if (!found.numbers) found.numbers = [];
                            found.numbers.push(Number(currentNumStr));
                        });
                    }
                }
                currentNumStr = "";
            }
            prevChar=currChar;
        }
    }
    let total = symbols.filter(s => s.numbers.length==2).reduce((total, current) => total + current.numbers.reduce((a,b) => a*b), 0);
    console.log("total: " + total);
});

function getAdjacentSymbols(lines, startIdx, number) {
    let symbols = [];
    let xMin = startIdx.col-1;
    let xMax = xMin + number.length + 1;
    let yMin = startIdx.row-1;
    let yMax = yMin + 2;

    // border cases:
    xMin = xMin<0 ? 0 : xMin;
    xMax = xMax>= lines[0].length-1 ? lines[0].length-1 : xMax;
    yMin = yMin<0 ? 0 : yMin;
    yMax = yMax>= lines.length-1 ? lines.length-1 : yMax;

    for (let row=yMin; row<=yMax; row++) {
        for (let col=y=xMin; col<=xMax; col++) {
            if (isSymbol(lines[row][col])) {
                symbols.push({
                    symbol: lines[row][col],
                    row: row,
                    col: col
                });
            }
        }
    }

    return symbols;
}

function isSymbol(character) {
    return character.match(/(?=[^\.])\D/) != null;
}

function isNumeric(character) {
    return character.match(/\d/) != null;
}