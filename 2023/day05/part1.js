const fs = require('node:fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let sections = data.split("\n\n");
  let seeds = sections[0].substring(sections[0].indexOf(":")+1).split(" ").map(n => n.trim()).filter(n => n != '').map(n => Number(n));
  let seed2soil = asMap(sections[1]);
  let soil2fertilizer = asMap(sections[2]);
  let fertilizer2water = asMap(sections[3]);
  let water2light = asMap(sections[4]);
  let light2temperature = asMap(sections[5]);
  let temperature2humidity = asMap(sections[6]);
  let humidity2location = asMap(sections[7]);

  /*
  seeds.forEach(s => (
    console.log("seed: " + s + ", location: " + map(map(map(map(map(map(map(s, seed2soil),soil2fertilizer),fertilizer2water),water2light),light2temperature),temperature2humidity),humidity2location))
  ));
  */

  let seedLocations = seeds.map(s => map(map(map(map(map(map(map(s, seed2soil),soil2fertilizer),fertilizer2water),water2light),light2temperature),temperature2humidity),humidity2location)).sort((a,b) => (a-b));
  console.log("result: " + seedLocations[0]);
});

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