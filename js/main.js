import globalGame from "./game.js";

document.addEventListener('DOMContentLoaded', async function () {
  const game = globalGame;
  game.draw();
  game.update();
  game.event();
});
