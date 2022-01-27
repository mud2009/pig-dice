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
  this.players[id].roll1 = roll();
  this.players[id].roll2 = roll();
};

PigDice.prototype.addRollToTurnTally = function(id) {
  this.players[id].turnTally = this.players[id].turnTally + this.players[id].roll1 + this.players[id].roll2;
  if (this.players[id].roll1 === 1 && this.players[id].roll2 === 1) {
    this.players[id].turnTally = 0;
    this.players[id].totalScore = 0;
    alert ("LOSE YOUR TURN & ALL POINTS");
  } else if (this.players[id].roll1 === 1 || this.players[id].roll2 === 1) {
    this.players[id].turnTally = 0;
    alert ("LOSE YOUR TURN!!!");
  }
  if ((this.players[id].turnTally + this.players[id].totalScore) >= 100){
    alert("YOU WIN!")
  }
};

PigDice.prototype.addTurnTallyToTotal = function(id) {
  this.players[id].totalScore = this.players[id].totalScore + this.players[id].turnTally
};

function resetAll(obj, val) {
  Object.keys(obj).forEach(function(index) {
      obj[index] = val
  });
}

let dice = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]

// Player logic

function Player() {
  this.roll1 = 0;
  this.roll2 = 0;
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
    $("#p1-roll").html(dice[(pigDice.players[1].roll1) - 1]);
    $("#p1-roll").append(", " + dice[(pigDice.players[1].roll2) - 1]);
    pigDice.addRollToTurnTally(1);
    $("#p1-turn-tally").html(pigDice.players[1].turnTally);
    $("#p1-total-score").html(pigDice.players[1].totalScore);
  });
  $("#player1-hold").on("click", function(){
    pigDice.addTurnTallyToTotal(1);
    pigDice.players[1].roll1 = 0;
    pigDice.players[1].roll2 = 0;
    pigDice.players[1].turnTally = 0;
    $("#p1-roll").html("");
    $("#p1-turn-tally").html("")
    $("#p1-total-score").html(pigDice.players[1].totalScore)
    })
  //Player2
  $("#player2-roll").on("click", function() {
    pigDice.newRoll(2);
    $("#p2-roll").html(dice[(pigDice.players[2].roll1) - 1]);
    $("#p2-roll").append(", " + dice[(pigDice.players[2].roll2) - 1]);
    pigDice.addRollToTurnTally(2);
    $("#p2-turn-tally").html(pigDice.players[2].turnTally);
    $("#p2-total-score").html(pigDice.players[2].totalScore);
  });
  $("#player2-hold").on("click", function(){
    pigDice.addTurnTallyToTotal(2);
    pigDice.players[2].roll1 = 0;
    pigDice.players[2].roll2 = 0;
    pigDice.players[2].turnTally = 0;
    $("#p2-roll").html("");
    $("#p2-turn-tally").html("");
    $("#p2-total-score").html(pigDice.players[2].totalScore);
    });
  // New Game button
  $("#new-game").on("click", function(){
    resetAll(pigDice.players[1], 0)
    resetAll(pigDice.players[2], 0)
    $("#p1-roll").html("");
    $("#p1-turn-tally").html("");
    $("#p1-total-score").html("");
    $("#p2-roll").html("");
    $("#p2-turn-tally").html("");
    $("#p2-total-score").html("");
    });
}

$(document).ready(function() {
  attachContactListeners();
});