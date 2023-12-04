const fs = require('node:fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let lines = data.split("\n");

  let games = lines.map(l => mapGame(l));
  games.forEach(g => g.hits = g.winningNumbers.filter(n => g.drawnNumbers.includes(n)).reduce((a,b) => a+1, 0));
  for (let i=0; i<games.length; i++) {
    for (let j=1; j<=Math.min(games.length-1, games[i].hits); j++) {
      games[i+j].numberOfCards += games[i].numberOfCards;
    }
  }
  let totalCards = games.map(g => g.numberOfCards).reduce((a,b) => a+b, 0);
  console.log("total: " + totalCards);
});

function mapGame(line) {
  let g = line.match(/(.*): ([^|]*)\| (.*)/);
  return {
    game: g[1],
    numberOfCards: 1,
    winningNumbers: g[2].split(" ").map(n => n.trim()).filter(n => n != '').map(n => Number(n)),
    drawnNumbers: g[3].split(" ").map(n => n.trim()).filter(n => n != '').map(n => Number(n)),
  };
}