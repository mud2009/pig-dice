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
  this.players[id].roll = roll();
  if (this.players[id].roll === 1) {
    this.players[id].roll = 1;
    this.players[id].turnTally = -1;
    alert("LOSE YOUR TURN!!!")
  }
};

PigDice.prototype.addRollToTurnTally = function(id) {
  this.players[id].turnTally = this.players[id].turnTally + this.players[id].roll;
  if ((this.players[id].turnTally + this.players[id].totalScore) >= 100){
    alert("Press hold you win!")
  }
};

PigDice.prototype.addTurnTallyToTotal = function(id) {
  this.players[id].totalScore = this.players[id].totalScore + this.players[id].turnTally
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
  //Player1
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
  //Player2
  $("#player2-roll").on("click", function() {
    pigDice.newRoll(2);
    $("#p2-roll").html(pigDice.players[2].roll);
    pigDice.addRollToTurnTally(2);
    $("#p2-turn-tally").html(pigDice.players[2].turnTally)
  });
  $("#player2-hold").on("click", function(){
    pigDice.addTurnTallyToTotal(2);
    pigDice.players[2].roll = 0;
    pigDice.players[2].turnTally = 0;
    $("#p2-total-score").html(pigDice.players[2].totalScore)
    $("#p2-roll").html(pigDice.players[2].roll);
    $("#p2-turn-tally").html(pigDice.players[2].turnTally)
  })
}

$(document).ready(function() {
  attachContactListeners();
});