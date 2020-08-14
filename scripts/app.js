/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundscore, activePlayer;

let gameIsPlaying = true;

init();

let dice1, dice2;

/*************************************************************************
 * ***************************ROLL THE DICE*******************************
 *************************************************************************/
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gameIsPlaying) {
    dice1 = Math.floor(Math.random() * 6 + 1);
    dice2 = Math.floor(Math.random() * 6 + 1);
    roundscore += dice1 + dice2;
    console.log(dice1, dice2, roundscore);

    document.querySelector("#dice-1").style.display = "block";
    document.querySelector("#dice-2").style.display = "block";

    if (dice1 === 1 || dice2 === 1) {
      dbDice();
    }

    if (dice1 === 6 && dice2 === 6) {
      dbDice();
      document.querySelector("#score-" + activePlayer).textContent = "0";
      scores[activePlayer] = 0;
      nextPlayer();
    }

    if (dice1 !== 1 && dice2 !== 1) {
      document.querySelector("#dice-1").src = "img/dice-" + dice1 + ".png";
      document.querySelector("#dice-2").src = "img/dice-" + dice2 + ".png";
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundscore;
    } else {
      nextPlayer();
    }
  }
});

/*************************************************************************
 * ***************************HOLD THE SCORE******************************
 *************************************************************************/
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gameIsPlaying) {
    scores[activePlayer] += roundscore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    let input = document.querySelector(".final-score").value;
    let finalScore;

    if (input) {
      finalScore = input;
    } else {
      finalScore = 100;
    }

    if (scores[activePlayer] >= finalScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gameIsPlaying = false;
    } else {
      nextPlayer();
    }
  }
});

/*************************************************************************
 * ***************************NEW GAME************************************
 *************************************************************************/
document.querySelector(".btn-new").addEventListener("click", init);

/*************************************************************************
 * ***************************FUNCTIONALITY*******************************
 *************************************************************************/
function dbDice() {
  document.querySelector("#dice-1").style.display = "block";
  document.querySelector("#dice-2").style.display = "block";
  document.querySelector("#dice-1").src = "img/dice-" + dice1 + ".png";
  document.querySelector("#dice-2").src = "img/dice-" + dice2 + ".png";
}

function init() {
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#current-0").textContent = "0";

  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";

  scores = [0, 0];
  activePlayer = 0;
  roundscore = 0;

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
  gameIsPlaying = true;
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  if (dice1 !== 1 && dice2 !== 1 && dice1 !== 6 && dice2 !== 6) {
    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";
  }

  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  roundscore = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}
