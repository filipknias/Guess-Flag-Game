import Game from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  //create new game object
  const game = new Game("#game-board");
  //get data from api
  game.getFlagsData().then((data) => {
    game.countriesData = data;
    game.init();
  });

  //add event listener to refresh button
  document.querySelector("#refresh-btn").addEventListener("click", () => {
    game.init();
  });
});
