var yourChoice;
var yourScore = 0;
var opponentChoice;
var opponentScore = 0;
var choices = ['rock', 'paper', 'scissors'];
window.onload = start;

function start() {
    for (let i = 0; i < 3; i++) {
        const choice = document.createElement('img');
        choice.id = choices[i];
        choice.src = choices[i] + '.png';
        document.getElementById('choices').append(choice);
        choice.addEventListener('click', selectChoice);
    }
}

function selectChoice() {
    yourChoice = this.id;
    document.getElementById('yourChoice').src = yourChoice + '.png';

    opponentChoice = choices[Math.floor(Math.random() * 3)];
    document.getElementById('opponentChoice').src = opponentChoice  + '.png';
}