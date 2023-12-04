const fs = require('node:fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let lines = data.split("\n");

  let games = lines.map(l => mapGame(l));
  let hitsPerGame = games.map(g => g.winningNumbers.filter(n => g.drawnNumbers.includes(n)).reduce((a,b) => a+1, 0));
  let totalPoints = hitsPerGame.filter(h => h>0).reduce((a,b) => a + Math.pow(2, b-1), 0)
  console.log("total: " + totalPoints);
});

function mapGame(line) {
  let g = line.match(/(.*): ([^|]*)\| (.*)/);
  return {
    game: g[1],
    winningNumbers: g[2].split(" ").map(n => n.trim()).filter(n => n != '').map(n => Number(n)),
    drawnNumbers: g[3].split(" ").map(n => n.trim()).filter(n => n != '').map(n => Number(n)),
  };
}