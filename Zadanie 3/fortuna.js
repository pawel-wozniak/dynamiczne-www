var lives = 5;

class Game {

  constructor() {
    this.lives = lives;
    this.password = this.generatePassword().toUpperCase();
    this.set = new Set();
    this.set.add(" ");
    alert(this.password);

    this.init();
  }

  init() {
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

    this.countriesDiv.appendChild(this.buttonsDiv);

    this.buttonPlay.addEventListener("click", this.playClick); 
    this.buttonAbout.addEventListener("click", this.aboutClick); 
  }

  playClick = e => {this.start();}
  aboutClick = e => {this.showAbout();}
  inputEnter = e => {
    if(e.keyCode == 13) {
      this.checkLetter();
    }
  }

  start() {
    this.textInput.addEventListener("keydown", this.inputEnter); 
    this.buttonsDiv.classList.add("remove");
    this.textInput.classList.add("recover");
    this.drawBoard();
  }

  generatePassword() {
    let min = 1;
    let max = data.length;
    return data[Math.floor(Math.random() * (max - min)) + min]['country'];
  }

  checkPassword() {
    this.password.split('').forEach(lett => {
      if(!this.hasLetter(lett)) {return false;}
    });
    return true;
  }

  hasLetter(letter) {
    return this.set.has(letter);
  }

  checkLetter() {
    let letter =  (game.textInput.value).toUpperCase();
    if (letter == '') {return;}
    if(! (game.password.includes(letter))) {
      this.lives--;
    } else if(game.hasLetter(letter)) {
      this.lives--;
    }
    else {
      this.set.add(letter);
    }
    if(lives == 0) {this.gameOver();}
    if(this.checkPassword()) {this.youWin();}
    this.drawBoard();
  }
 
  drawBoard() {
    this.countriesDiv.replaceChildren();
    this.countriesDiv.appendChild(this.drawLetters());
    this.countriesDiv.appendChild(this.textInput);
    this.countriesDiv.appendChild(this.livesDiv);
    this.livesDiv.innerHTML = "Lives: " + this.lives;
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

  aboutBack = e => {
    this.buttonsDiv.classList.remove("remove");
    this.buttonsDiv.classList.add("recover");
    this.aboutDiv.classList.add("remove");
    this.buttonPlay.addEventListener("click", this.playClick); 
    this.buttonAbout.addEventListener("click", this.aboutClick); 
  }

  gameOver() {}
  youWin() {}
}

var game = new Game();




// var game = {
//   zdobyte : 0,
//   zycia : 1,
// }
// // alert(data[0]['country']);
// var elem = document.getElementById("panstwa");
// elem.innerHTML =data[0]['country'];

// // alert(data.length);
// // alert(data[0]['country'][2]);

//  for (var i = 0; i < data[0]['country'].length; i += 1) {
//     // alert(data[0]['country'][i]);  
//   }


// addElement("wrap");
// //LISTENERS

// //document.getElementById("graj").addEventListener("click", Sprawdz_Litery); 
// // alert(game.zycia);


// //FUNKCJE
// function Sprawdz_Litery(){
//   var liter = document.getElementById("wpisz_litere").value;
//   // alert(liter);
//   // alert(getRandomInt(10,20));
// }

// function addElement(mydiv)
// {
 
//   newDiv = document.createElement("span");
//   newDiv.innerHTML = "jasiokotek";

//   my_div = document.getElementById(mydiv);
//   //document.body.insertBefore(newDiv, my_div);

//   newDiv2 = document.createElement("span");
//   newDiv2.innerHTML = "jasiokotek2";
//   //document.body.insertBefore(newDiv2, my_div.nextSibling);

//   newDiv.classList.add("mystyle");  
// }



// document.getElementById("about").addEventListener("click", showAbout); 

// function showAbout() {
//   aboutDiv = document.getElementById("panstwa");
//   aboutDiv.classList.add("display: block;");
//   document.getElementById("about").addEventListener("click", hideAbout); 
// }

// function shideAbout() {
//   aboutDiv = document.getElementById("panstwa");
//   aboutDiv.classList.add("display: block;");
//   document.getElementById("about").addEventListener("click", hideAbout); 
// }