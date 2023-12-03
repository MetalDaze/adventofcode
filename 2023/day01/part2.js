const fs = require('node:fs');

const numbers = {
  "1": 1, 
  "one": 1, 
  "2": 2, 
  "two": 2, 
  "3": 3, 
  "three": 3, 
  "4": 4, 
  "four": 4, 
  "5": 5, 
  "five": 5, 
  "6": 6, 
  "six": 6, 
  "7": 7, 
  "seven": 7, 
  "8": 8, 
  "eight": 8, 
  "9": 9, 
  "nine": 9 
};

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let lines = data.split("\n");
  console.log(lines.map(l => toNumbers(l)).reduce((total,current) => total+current));
});

function toNumbers(line) {
  let indices = Object.entries(numbers).map(([key, value]) => { 
    return {
      "number": key,
      "minIdx": line.indexOf(key),
      "maxIdx": line.lastIndexOf(key)
    }
  });

  let minNumber = indices.filter(n => n.minIdx >= 0).sort((a, b) => a.minIdx - b.minIdx)[0].number;
  let maxNumber = indices.filter(n => n.maxIdx >= 0).sort((a, b) => b.maxIdx - a.maxIdx)[0].number;

  return asNumber(minNumber)*10 + asNumber(maxNumber);
}

function asNumber(numStr) {
  return numbers[numStr];
}