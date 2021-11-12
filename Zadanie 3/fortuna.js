class Game {

  constructor() {
    this.lives = 5;
    this.password = this.generatePassword().toUpperCase();
    this.set = new Set();
    this.set.add(" ");
    this.countriesDiv = document.getElementById("countries");
    this.buttonsDiv = document.createElement("div");
    this.livesDiv = document.createElement("div");
    this.aboutDiv = document.createElement("div");
    this.buttonPlay = document.createElement("button");
    this.buttonAbout = document.createElement("button");
    this.textInput = document.createElement("input");

    this.buttonsDiv.appendChild(this.buttonPlay);
    this.buttonsDiv.appendChild(this.buttonAbout);

    this.buttonPlay.innerHTML = "Play";
    this.buttonAbout.innerHTML = "About";
    this.textInput.maxLength = 1;
    this.textInput.classList.add("remove");
    this.livesDiv.classList.add("lives");

    this.countriesDiv.appendChild(this.buttonsDiv);

    this.buttonPlay.addEventListener("click", this.playClick); 
    this.buttonAbout.addEventListener("click", this.aboutClick); 
  }

  playClick = e => {this.start();}
  aboutClick = e => {this.showAbout();}
  restart = e => {window.location.reload();}
  inputEnter = e => {this.checkLetter(e);}
  aboutBack = e => {this.hideAbout();}

  start() {
    alert(this.password);
    this.textInput.addEventListener("keydown", this.inputEnter); 
    this.buttonsDiv.classList.add("remove");
    this.textInput.classList.add("recover");
    this.drawBoard();
  }

  generatePassword() {
    return data[Math.floor(Math.random() * (data.length - 1)) + 1]['country'];
  }

  checkPassword() {
    let flag = true;
    this.password.split('').forEach(lett => {
      if(!this.hasLetter(lett)) {flag = false;}
    });
    return flag;
  }

  hasLetter(letter) {
    return this.set.has(letter);
  }

  checkLetter(e) {
    if(e.keyCode != 13) {return;}

    let letter =  (this.textInput.value).toUpperCase();
    if (letter == '') {return;}

    if(! (this.password.includes(letter)) ||  this.hasLetter(letter)) {
      this.lives--;
    } else {
      this.set.add(letter);
    }
    this.drawBoard();

    if(this.lives == 0) {this.gameOver(); return;}
    if(this.checkPassword()) {this.youWin(); return;}
  }
 
  drawBoard() {
    this.countriesDiv.replaceChildren();
    this.countriesDiv.appendChild(this.drawLetters());
    this.countriesDiv.appendChild(this.textInput);
    this.countriesDiv.appendChild(this.livesDiv);
    this.livesDiv.innerHTML = "Lives: " + this.lives;

    this.textInput.value = "";
    this.textInput.classList.add("input");
    this.textInput.focus();
  }

  drawLetters() {
    this.lettersDiv = document.createElement("div");
    this.lettersDiv.classList.add("letters");

    this.password.split('').forEach(lett => {
      let letterDiv = document.createElement("div");
      letterDiv.classList.add("letter");
      if(lett == " ") {letterDiv.classList.add("letter_space");}
      letterDiv.appendChild(this.drawLetter(lett));

      this.lettersDiv.appendChild(letterDiv);
    });

    return this.lettersDiv;
  }
  
  drawLetter(lett) {
    let letterP = document.createElement("p");
    letterP.innerHTML = lett;
    if(!this.hasLetter(lett)) {letterP.classList.add("hide");} else {letterP.classList.add("show");}
    return letterP;
  }

  showAbout() {
    this.buttonsDiv.classList.remove("recover");
    this.buttonsDiv.classList.add("remove");
    this.countriesDiv.appendChild(this.aboutDiv);
    this.aboutDiv.classList.add("about");
    this.aboutDiv.classList.remove("remove");
    this.aboutDiv.innerHTML = "Bla bla";
    this.aboutDiv.addEventListener("click", this.aboutBack);
  }

  hideAbout() {
    this.buttonsDiv.classList.remove("remove");
    this.buttonsDiv.classList.add("recover");
    this.aboutDiv.classList.add("remove");
  }

  gameOver() {
    let screen = this.splashDiv();
    screen.classList.add("game_over");
  }

  youWin() {
    let screen = this.splashDiv();
    screen.classList.add("You_win");
  }

  splashDiv() {
    this.textInput.classList.remove("recover");
    this.textInput.classList.add("remove");
    let screen = document.createElement("div");
    screen.classList.add("about");
    this.countriesDiv.appendChild(screen);
    screen.addEventListener("click", this.restart);
    return screen;
  }
}

var game = new Game();