export default class Game {
  constructor(gameBoardId) {
    this.gameBoard = document.querySelector(gameBoardId);
    this.flagsState = [];
  }

  init() {
    //create random flag elements
    fetch("countries.json")
      .then((res) => res.json())
      .then((countries) => {
        //get random flags
        this.getRandomFlags(65, countries);
        //display flags on screen
        this.displayFlags();
        console.log(countries);
        console.log(this.flagsState);
      });
  }

  displayFlags() {
    if (!this.flagsState) return;
    this.flagsState.forEach((item) => {
      const div = document.createElement("div");
      const img = document.createElement("img");

      this.gameBoard.appendChild(div);
      div.appendChild(img);

      div.classList.add("flag-container");
      img.classList.add("flag");

      img.src = `https://www.countryflags.io/${item.code}/flat/64.png`;
    });
  }

  getRandomFlags(flagsAmount, countries) {
    //randomize flags without repeating items
    while (this.flagsState.length < flagsAmount) {
      const randomFlag = Math.floor(Math.random() * flagsAmount) + 1;
      if (!this.flagsState.includes(countries[randomFlag])) {
        this.flagsState.push(countries[randomFlag]);
      }
    }
  }
}
