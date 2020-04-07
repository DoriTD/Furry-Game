//4. Preparing constructor for Furry and the coin
var Coin = function() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
};


module.exports = Coin;