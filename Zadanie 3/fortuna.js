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

    this.quote = "Będzie fajnie!";
    this.auth = "Anonimowy wykładowca PŁ";
    this.getQuote();
  }

  playClick = e => {this.start();}
  aboutClick = e => {this.showAbout();}
  restart = e => {window.location.reload();}
  inputEnter = e => {this.checkLetter(e);}
  aboutBack = e => {this.hideAbout();}
  getQuote = async () => {
    const response = await fetch("https://type.fit/api/quotes");
    const quotes = await response.json();
    const index = Math.floor(Math.random()*quotes.length);
    this.quote=quotes[index].text;
    this.auth=quotes[index].author;
  }

  start() {
    alert(this.password);
    this.textInput.addEventListener("keydown", this.inputEnter); 
    this.buttonsDiv.classList.add("remove");
    this.textInput.classList.add("recover");
    this.drawBoard();
  }

  generatePassword() {return data[Math.floor(Math.random() * (data.length - 1)) + 1]['country'];}
  hasLetter(letter) {return this.set.has(letter);}

  checkPassword() {
    let flag = true;
    this.password.split('').forEach(lett => {
      if(!this.hasLetter(lett)) {flag = false;}
    });
    return flag;
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
    (!this.hasLetter(lett)) ? letterP.classList.add("hide") : letterP.classList.add("show");
    return letterP;
  }

  showAbout() {
    this.buttonsDiv.classList.remove("recover");
    this.buttonsDiv.classList.add("remove");
    this.countriesDiv.appendChild(this.aboutDiv);
    this.aboutDiv.classList.add("popUp");
    this.aboutDiv.classList.add("about");
    this.aboutDiv.classList.remove("remove");
    this.aboutDiv.innerHTML = "<span>made by: <b>Paweł Woźniak</b><br>224868</span>";
    this.aboutDiv.insertAdjacentHTML('beforeend', "<span><i>\""+this.quote+"\"</i><br><br>"+this.auth+"</span>");
    this.aboutDiv.addEventListener("click", this.aboutBack);
  }

  hideAbout() {
    this.buttonsDiv.classList.remove("remove");
    this.buttonsDiv.classList.add("recover");
    this.aboutDiv.classList.remove("about");
    this.aboutDiv.classList.add("remove");
  }

  gameOver() {
    let textP = this.splashP("YOU LOSE!");
    textP.classList.add("game_over");
  }

  youWin() {
    let textP = this.splashP("YOU WIN!");
    textP.classList.add("you_win");
  }

  splashP(text) {
    this.countriesDiv.replaceChildren();
    let textP = document.createElement("p");
    textP.innerHTML = text;
    textP.classList.add("text");
    this.countriesDiv.appendChild(textP);
    this.countriesDiv.addEventListener("click", this.restart);
    return textP;
  }
}

var game = new Game();