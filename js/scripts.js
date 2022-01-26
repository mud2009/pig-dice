// PigDice logic
function PigDice () {
  this.players = {};
  this.currentId = 0;
}

PigDice.prototype.addPlayer = function (player) {
  player.id = this.assignId();
  this.players[player.id] = player;
};

PigDice.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

PigDice.prototype.newRoll = function(id) {
  this.players[id].roll = 0;
  this.players[id].roll = roll();
};

PigDice.prototype.addRollToTurnTally = function(id) {
  this.players[id].turnTally = 0;
  this.players[id].turnTally = this.players[id].turnTally + this.players[id].roll;
};

PigDice.prototype.addTurnTallyToTotal = function(id) {
  this.players[id].totalScore = this.players[id].totalScore + this.players[id].turnTally
}

// PigDice.prototype

// Player logic

function Player() {
  this.roll = 0;
  this.turnTally = 0;
  this.totalScore = 0;
}

function roll(){
  return Math.floor((Math.random()*6) +1);
};

// UI logic
let pigDice = new PigDice();
let player1 = new Player(1);
let player2 = new Player(2);
pigDice.addPlayer(player1);
pigDice.addPlayer(player2);

function displayRoll() {
  $("#p1-roll").text(pigDice.players[1].roll);
}

// function displayTurnTally() {
//   $("#p1-turn-tally")
// }

// function displayTotalScore() {
// }


$(document).ready(function() {
  // $("form#new-contact").submit(function(event) {
    // event.preventDefault();
  displayRoll();
    // });
});