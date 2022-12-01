let yourChoice
let player1 = 0
let opponentChoice
let player2 = 0
const choices = ['rock', 'paper', 'scissors']
window.onload = start

function start() {
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
  document.getElementById('yourChoice').src = yourChoice + '.png'

  opponentChoice = choices[Math.floor(Math.random() * 3)]
  document.getElementById('opponentChoice').src = opponentChoice + '.png'

  const winner = selectWinner(yourChoice, opponentChoice)
  if (winner) {
    updateScore(winner)
  }
}

function selectWinner(yourChoice, opponentChoice) {
  let result = yourChoice + opponentChoice
  let winner = ''
  switch (result) {
    // case 'rockrock', 'paperpaper', 'scissorsscissors':
    //   winner = 'tie'
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
  if (winner === 'Player1') {
    player1 += 1
    document.querySelector('#yourScore').textContent = `Your Score: ${player1}`
  } else {
    player2 += 1
    document.querySelector(
      '#opponentScore'
    ).textContent = `Opponent's Score: ${player2}`
  }
}
