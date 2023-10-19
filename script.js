'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

let score, currentStore, activePlayer, playing;

// Starting Condition
const init = function(){
    score = [0, 0];
    currentStore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

};

init();

const closeModal = function () {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
};

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentStore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if(playing){
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. Check for rolled 1
        if(dice !==1 ){
            // Add dice to current score
            currentStore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentStore;
        } else{
            //Switch to next player
            switchPlayer();
        }
    }
});


// Hold
btnHold.addEventListener('click', function() {
    if(playing){
        // 1. Add current score to active player's score
        score[activePlayer] += currentStore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer]; 

        // 2. Check if player's score is >= 50
        if(score[activePlayer] >= 50){
            // Finish the game
            playing = false;
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            overlay.addEventListener('click', closeModal);

            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else{
            // Swith to the next player
            switchPlayer();
        }
        
    }
});

// New Game
btnNew.addEventListener('click', init);