const fs = require('node:fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let start = Date.now();

  let sections = data.split("\n\n");
  let seeds = mapSeeds(sections[0]).sort((a,b) => a.start-b.start);
  let seed2soil = asMap(sections[1]);
  let soil2fertilizer = asMap(sections[2]);
  let fertilizer2water = asMap(sections[3]);
  let water2light = asMap(sections[4]);
  let light2temperature = asMap(sections[5]);
  let temperature2humidity = asMap(sections[6]);
  let humidity2location = asMap(sections[7]);

  let minSeedLocation = -1;
  for (let i=0; i<seeds.length-1; i+=2) {
    for (let j=seeds[i].start; j<seeds[i].end; j++) {
      let loc = map(map(map(map(map(map(map(j, seed2soil),soil2fertilizer),fertilizer2water),water2light),light2temperature),temperature2humidity),humidity2location);
      if (minSeedLocation == -1 || loc<minSeedLocation) {
        minSeedLocation = loc;
      }
    }

  }
  let end = Date.now();
  console.log("result: " + minSeedLocation);
  console.log("Runtime: " + (end-start) + "ms");
  // result: 78775051
  // Runtime: 645245ms
});

function mapSeeds(line) {
  let result = [];
  let numbers = line.substring(line.indexOf(":")+1).split(" ").map(n => n.trim()).filter(n => n != '').map(n => Number(n));
  for (let i=0; i<numbers.length-1; i+=2) {
    result.push({
      start: numbers[i],
      end: numbers[i] + numbers[i+1]
    });
  }

  return result;
}

function asMap(section) {
  let lines = section.split("\n").splice(1);
  return lines.map(l => {
    let parts = l.split(" ");
    return {
      destRangeStart: Number(parts[0]),
      sourceRangeStart: Number(parts[1]),
      rangeLength: Number(parts[2])
    }
  });
}

function map(value, map) {
  let result = value;
  map.every(range => {
    if (value >= range.sourceRangeStart && value <= range.sourceRangeStart + range.rangeLength) {
      result = range.destRangeStart + value-range.sourceRangeStart;
      return false;
    }
    return true;
  });
  return result;
}