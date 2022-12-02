let yourChoice
let player1 = 0
let opponentChoice
let player2 = 0
const choices = ['rock', 'paper', 'scissors']
window.onload = start

function initModal() {
  document.querySelector('#modalToggle').click()
}

function start() {
  initModal()
  for (let i = 0; i < 3; i++) {
    const choice = document.createElement('img')
    choice.id = choices[i]
    choice.src = choices[i] + '.png'
    document.getElementById('choices').append(choice)
    choice.addEventListener('click', selectChoice)
  }
}

function selectChoice() {
  yourChoice = this.id
  let elem = document.getElementById('yourChoice')
  elem.src = yourChoice + '.png'
  elem.style.transform = 'scaleX(-1)'

  opponentChoice = choices[Math.floor(Math.random() * 3)]
  document.getElementById('opponentChoice').src = opponentChoice + '.png'

  const winner = selectWinner(yourChoice, opponentChoice)

  updateScore(winner)
}

function selectWinner(yourChoice, opponentChoice) {
  let result = yourChoice + opponentChoice
  let winner = ''
  switch (result) {
    case 'rockscissors':
    case 'paperrock':
    case 'scissorspaper':
      winner = 'Player1'
      break
    case 'rockpaper':
    case 'paperscissors':
    case 'scissorsrock':
      winner = 'Player2'
  }
  return winner
}

function updateScore(winner) {
  let playerOne = document.querySelector('#yourScore')
  let playerTwo = document.querySelector('#opponentScore')
  if (winner === 'Player1') {
    player1 += 1
    playerOne.textContent = `Your Score: ${player1}`
    playerOne.style.backgroundColor = 'green'
    playerTwo.style.backgroundColor = 'red'
  } else if (winner === 'Player2') {
    player2 += 1
    playerTwo.textContent = `Opponent's Score: ${player2}`
    playerTwo.style.backgroundColor = 'green'
    playerOne.style.backgroundColor = 'red'
  } else {
    playerTwo.style.backgroundColor = 'yellow'
    playerOne.style.backgroundColor = 'yellow'
  }
}
