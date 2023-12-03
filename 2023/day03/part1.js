const fs = require('node:fs');
const { workerData } = require('node:worker_threads');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split("\n");

    let total = 0;
    let prevChar = ".";
    let currentNumStr = "";
    let currentStartIdx = { row: -1, col: -1 };
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
                    console.log(currentNumStr + " hasAdjacentSymbol ? " + hasAdjacentSymbol(lines, currentStartIdx, currentNumStr));
                    if (hasAdjacentSymbol(lines, currentStartIdx, currentNumStr)) {
                        total += Number(currentNumStr);
                    }
                }
                currentNumStr = "";
            }
            prevChar=currChar;
        }
    }
    console.log("total: " + total);
});

function hasAdjacentSymbol(lines, startIdx, number) {
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
                return true;
            }
        }
    }

    return false;
}

function isSymbol(character) {
    return character.match(/(?=[^\.])\D/) != null;
}

function isNumeric(character) {
    return character.match(/\d/) != null;
}