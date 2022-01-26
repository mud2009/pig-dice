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
  console.log(pigDice.players[1].roll)
};

PigDice.prototype.addRollToTurnTally = function(id) {
  this.players[id].turnTally = this.players[id].turnTally + this.players[id].roll;
};

PigDice.prototype.addTurnTallyToTotal = function(id) {
  this.players[id].totalScore = this.players[id].totalScore + this.players[id].turnTally
};

PigDice.prototype.findPlayer = function(id) {
  if (this.players[id] != undefined) {
    return this.players[id]
  }
  return false;
};

// Player logic

function Player() {
  this.roll = 0;
  this.turnTally = 0;
  this.totalScore = 0;
}

function roll(){
  return Math.floor((Math.random()*6) +1);
};

// UI logic -------------------------
let pigDice = new PigDice();

let player1 = new Player(1);
let player2 = new Player(2);
pigDice.addPlayer(player1);
pigDice.addPlayer(player2);

function attachContactListeners() {
  $("#player1-roll").on("click", function() {
    pigDice.newRoll(1);
    $("#p1-roll").html(pigDice.players[1].roll);
    pigDice.addRollToTurnTally(1);
    $("#p1-turn-tally").html(pigDice.players[1].turnTally)
  });
  $("#player1-hold").on("click", function(){
    pigDice.addTurnTallyToTotal(1);
    pigDice.players[1].roll = 0;
    pigDice.players[1].turnTally = 0;
    $("#p1-total-score").html(pigDice.players[1].totalScore)
    $("#p1-roll").html(pigDice.players[1].roll);
    $("#p1-turn-tally").html(pigDice.players[1].turnTally)
  })
}

$(document).ready(function() {
  attachContactListeners();
});