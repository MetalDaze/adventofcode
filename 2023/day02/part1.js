const fs = require('node:fs');

const redCubes = 12, greenCubes = 13, blueCubes = 14;

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split("\n");
    const games = lines.map(parseGame);
    let validGames = games.filter(g => g.maxBlue <= blueCubes && g.maxGreen <= greenCubes && g.maxRed <= redCubes).map(g => Number(g.id));
    console.log(validGames.reduce((total, current) => total+current));
});

function parseGame(line) {
    //Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    let sets = line.substring(line.indexOf(":")+1).split(";").map(parseSet);
    return game = {
        "id": line.match(/^Game (\d+): .*/)[1],
        "sets": sets,
        "maxBlue": sets.map(s => s.totalBlue).reduce((a,b) => Math.max(a,b)),
        "maxGreen": sets.map(s => s.totalGreen).reduce((a,b) => Math.max(a,b)),
        "maxRed": sets.map(s => s.totalRed).reduce((a,b) => Math.max(a,b)),
    }
}

function parseSet(set) {
    let draws = set.split(",").map(parseDraw);

    return {
        "draws": draws,
        "totalBlue": draws.filter(d => d.color == "blue").map(d => d.count).reduce((total,current) => total+current, 0),
        "totalGreen": draws.filter(d => d.color == "green").map(d => d.count).reduce((total,current) => total+current, 0),
        "totalRed": draws.filter(d => d.color == "red").map(d => d.count).reduce((total,current) => total+current, 0)
    }
}

function parseDraw(draw) {
    let d = draw.trim().split(" ");

    return {
        "color": d[1].trim(),
        "count": Number(d[0].trim())
    }
}