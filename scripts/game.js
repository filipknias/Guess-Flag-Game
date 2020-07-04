export default class Game {
  constructor(gameBoardId) {
    this.gameBoard = document.querySelector(gameBoardId);
    this.flagsAmount = 50;
    this.flagsGrid = [];
    this.countriesQueue = [];
    this.score = 0;
    this.fails = 0;
  }

  init() {
    //reset gameBoard
    this.gameBoard.innerHTML = "";
    //reset all properties
    this.score = 0;
    this.fails = 0;
    this.flagsGrid = [];
    this.countriesQueue = [];
    //randomize random flags on grid and random items in country queue
    this.setRandomFlags(this.flagsAmount, this.countriesData);
    //display flags on screen
    this.displayFlags();
    //update current country name
    this.updateCountryName(this.countriesQueue[this.score].name);
    //update flags to go and score
    this.updateScore();
    //update fails
    this.updateFails();
  }

  async getFlagsData() {
    const url = "countries.json";
    const apiResponse = await fetch(url);
    const flagsData = await apiResponse.json();
    return flagsData;
  }

  displayFlags() {
    this.flagsGrid.forEach((item) => {
      const div = document.createElement("div");
      const img = document.createElement("img");

      this.gameBoard.appendChild(div);
      div.appendChild(img);

      div.classList.add("flag-container");
      img.classList.add("flag");

      img.src = `https://www.countryflags.io/${item.code}/flat/64.png`;

      div.addEventListener("click", () => {
        this.checkFlag(item.name, div);
      });
    });
  }

  setRandomFlags(flagsAmount) {
    //check if flagsAmount is not bigger than countries array
    if (flagsAmount > this.countriesData.length) return;
    //randomize flags
    while (this.flagsGrid.length < flagsAmount) {
      const randomFlag = Math.floor(Math.random() * this.countriesData.length);

      if (!this.flagsGrid.includes(this.countriesData[randomFlag])) {
        this.flagsGrid.push(this.countriesData[randomFlag]);
      }
    }

    //randomize counries queue
    while (this.countriesQueue.length < this.flagsGrid.length) {
      const randomCountry = Math.floor(Math.random() * this.flagsGrid.length);

      if (!this.countriesQueue.includes(this.flagsGrid[randomCountry])) {
        this.countriesQueue.push(this.flagsGrid[randomCountry]);
      }
    }
  }

  checkFlag(countryName, flagElement) {
    //check if clicked flag is correct or wrong
    const currectCountry = this.countriesQueue[this.score].name;
    if (countryName === currectCountry) {
      //add correct class to flag element
      flagElement.classList.add("correct");
      //increase and update score
      this.score++;
      this.updateScore();
      //check for win
      this.checkForWin();
      //change current country name
      this.updateCountryName(this.countriesQueue[this.score].name);
    } else {
      //add wrong class to flag element
      flagElement.classList.add("wrong");
      //delete wrong class from flag element
      setTimeout(() => {
        flagElement.classList.remove("wrong");
      }, 700);
      //update fails
      this.fails++;
      this.updateFails();
    }
  }

  updateCountryName(countryName) {
    const countryNameTextElement = document.querySelector("#current-country");
    countryNameTextElement.textContent = countryName;
  }

  updateScore() {
    //set score text element
    const scoreTextElement = document.querySelector("#user-score");
    scoreTextElement.textContent = `${this.score.toString()} Points`;
    //set flags to go text element
    const flagsToGoTextElement = document.querySelector("#user-flags-to-go");
    flagsToGoTextElement.textContent = (
      this.flagsGrid.length - this.score
    ).toString();
  }

  updateFails() {
    const failsTextElement = document.querySelector("#user-fails");
    failsTextElement.textContent = `${this.fails.toString()} Fails`;
  }

  checkForWin() {
    if (this.score === this.flagsGrid.length) {
      alert("Congratulations, You Guessed All The Flags!");
      this.init();
    }
  }
}
