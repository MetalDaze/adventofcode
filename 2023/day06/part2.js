const fs = require('node:fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split("\n");
    let total = getNumberOfWins(mapGame(lines));

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

function mapGame(lines) {
    let time = Number(lines[0].replace(/\D/g, ""));
    let distance = Number(lines[1].replace(/\D/g, ""))

    return {
        time: time,
        recordDistance: distance
    };
}