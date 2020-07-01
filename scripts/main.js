import Game from "./game.js";

document.querySelector("#play-button").addEventListener("click", () => {
  //hide intro section
  const introSection = document.querySelector(".intro-section");
  introSection.classList.add("hidden");
});

const flagsGame = new Game("#game-board");
flagsGame.init();
