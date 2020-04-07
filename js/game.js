var Furry = require("./furry");
var Coin = require("./coin");

//5. Preparing an object controlling the game
var Game = function() {
  this.board = document.querySelectorAll("#board div");
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;

  //6. Calculating position

  this.index = function(x, y) {
    return x + y * 10;
  };

  //7. Drawing the board state

  this.showFurry = function() {
    this.hideVisibleFurry();
    this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
  };
  this.showCoin = function() {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
  };

  //8. Start
  this.startGame = function() {
    //creem o var self pe care putem sa o folosim in setInterval(event)/din pct. 9
    var self = this;
    this.idSetInterval = setInterval(function() {
      self.moveFurry();
    }, 250);
  };
  //9. Modifying Furry position depending on the direction
  this.moveFurry = function() {
    if (this.furry.direction == "right") {
      this.furry.x = this.furry.x + 1;
    }
    if (this.furry.direction == "left") {
      this.furry.x = this.furry.x - 1;
    }
    if (this.furry.direction == "up") {
      this.furry.y = this.furry.y - 1;
    }
    if (this.furry.direction == "down") {
      this.furry.y = this.furry.y + 1;
    }
    this.gameOver();
    this.showFurry();
    this.checkCoinCollision();
  };

  //Clearing the view - removing unnecessary classes
  this.hideVisibleFurry = function() {
    if (document.querySelector(".furry")) {
      //Remember to always search for just one element
      document.querySelector(".furry").classList.remove("furry");
    }
  };
  //10. Keyboard support
  this.turnFurry = function(event) {
    switch (event.which) {
      case 37:
        this.furry.direction = "left";
        break;
      case 38:
        this.furry.direction = "up";
        break;
      case 39:
        this.furry.direction = "right";
        break;
      case 40:
        this.furry.direction = "down";
        break;
    }
  };
  //11. Checking for collision with the coin
  this.checkCoinCollision = function() {
    //Check if Furry's position is the same as the coin's
    if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
      document.querySelector(".coin").classList.remove("coin"); //remove coin class from current location
      this.score = this.score + 1; //increase the score by 1 point
      document.querySelector("#score div strong").innerText = this.score; //update the score in the element with score id on the page
      this.coin = new Coin(); //create a new coin object and assign it to this.coin
      this.showCoin();
    }
  };
  //12. Checking for collision with the wall
  this.gameOver = function() {
    //Check the Furry's position
    if (
      this.furry.x < 0 ||
      this.furry.x > 9 ||
      this.furry.y < 0 ||
      this.furry.y > 9
    ) {
      clearInterval(this.idSetInterval);
      this.hideVisibleFurry();
      document.querySelector("#over pre").innerText =
        "YOUR SCORE IS : " + this.score;
      document.querySelector("#over").classList.remove("invisible");
    }
  };
};

module.exports = Game;
