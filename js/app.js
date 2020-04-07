var Game = require("./game");
//7. Drawing the board state
var game = new Game();
game.showFurry();
game.showCoin();

//8. Start
game.startGame();

//10. Keyboard support
document.addEventListener("keydown", function(event) {
  game.turnFurry(event);
});
