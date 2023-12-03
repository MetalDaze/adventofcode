const fs = require('node:fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let lines = data.split("\n");

  let sum = lines.map(l => { 
    let nStr = l.replace(/[a-z]/g, ""); 
    let number = nStr[0] + nStr[nStr.length-1]; return Number(number)
  }).reduce((total, current) => total + current);
  console.log(sum);
});