'use strict';

let btnRollDice = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let btnNew = document.querySelector(".btn--new");

let player0El = document.querySelector(".player--0");
let player1El = document.querySelector(".player--1");
let score0El = document.querySelector("#score--0");
let current0El = document.getElementById("current--0");
let score1El = document.getElementById("score--1");
let current1El = document.getElementById("current--1");
let diceEl = document.querySelector(".dice");

let totalScores;
let currentTotal;
let activePlayer;
let playing;

function init() {
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");

    diceEl.classList.add("hidden");

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    totalScores = [0, 0];
    currentTotal = 0;
    activePlayer = 0;
    playing = true;
}

init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentTotal = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

btnRollDice.addEventListener("click", function () {
    if (playing) {
        let score = Number(Math.trunc(Math.random() * 6) + 1);
        console.log(`Score: ${score}`);
        diceEl.src = `dice-${score}.png`;
        if (score !== 1) {
            currentTotal += score;
            console.log(`Total: ${currentTotal}`);
            diceEl.classList.remove("hidden");
            document.getElementById(`current--${activePlayer}`).textContent = currentTotal;
        } else {
            switchPlayer();
            console.log("Game Restart");
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        totalScores[activePlayer] += currentTotal;
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

        if (totalScores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", function () {
    init();
});