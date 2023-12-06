const fs = require('node:fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split("\n");
    let total = mapGames(lines).map(game => getNumberOfWins(game)).reduce((a,b) => (a*((b == 0) ? 1 : b)), 1);

    console.log("total: " + total);
});

function getNumberOfWins(game) {
    let wins = 0;
    for (let millisPressed=1; millisPressed<game.time-1; millisPressed++) {
        if (millisPressed*(game.time-millisPressed) > game.recordDistance) {
            wins++;
        }
    }
    return wins;
}

function mapGames(lines) {
    let times = lines[0].substring(lines[0].indexOf(":")+1).split(" ").map(n => n.trim()).filter(n => n != '').map(n => Number(n));
    let distances = lines[1].substring(lines[1].indexOf(":")+1).split(" ").map(n => n.trim()).filter(n => n != '').map(n => Number(n));

    let games = [];
    for (let i=0; i<times.length; i++) {
        games.push({
            time: times[i],
            recordDistance: distances[i]
        });
    }

    return games;
}