let yourChoice
let opponentChoice
let numPlayers
let lastWinner
let player1 = 0
let player2 = 0
const choices = ['rock', 'paper', 'scissors']
const playerOne = document.querySelector('#your-score')
const playerTwo = document.querySelector('#opponent-score')
const yourChoiceElement = document.querySelector('#your-choice')
const oppChoiceElement = document.querySelector('#opponent-choice')
const numPlayersElement = document.querySelector('#players-num')
const modalContainer = document.querySelector('#modal-container')
const btns1 = document.querySelector('#player1-choices')
const btns2 = document.querySelector('#player2-choices')
const modal = document.querySelector('#modal')

window.onload = start
window.onunload = save

function start() {
  if (localStorage.getItem('numPlayers')) {
    numPlayers = Number(localStorage.getItem('numPlayers'))
    player1 = Number(localStorage.getItem('player1'))
    player2 = Number(localStorage.getItem('player2'))
    lastWinner = localStorage.getItem('lastWin')
    playerOne.textContent = `You: ${player1}`
    playerTwo.textContent = `You: ${player2}`
    if (lastWinner === 'Player1') {
      playerOne.style.backgroundColor = 'green'
      playerTwo.style.backgroundColor = 'red'
    } else if (lastWinner === 'Player2') {
      playerTwo.style.backgroundColor = 'green'
      playerOne.style.backgroundColor = 'red'
    } else {
      playerOne.style.backgroundColor = 'yellow'
      playerTwo.style.backgroundColor = 'yellow'
    }
    initChoices()
  } else {
    initModal(true)
  }
}

function selectChoice() {
  const selected = this.id
  if (selected.slice(-1) === '1') {
    yourChoice = selected
    yourChoiceElement.src = 'done.png'
    toggleButtons(false, btns1)
  } else {
    opponentChoice = selected
    oppChoiceElement.src = 'done.png'
    toggleButtons(false, btns2)
  }
  if (numPlayers === 1) {
    opponentChoice = choices[Math.floor(Math.random() * 3)] + 2
  }
  processChoices()
}

function selectWinner(yourChoice, opponentChoice) {
  const result = yourChoice + opponentChoice
  let winner = ''
  switch (result) {
    case 'rock1scissors2':
    case 'paper1rock2':
    case 'scissors1paper2':
    case 'rock1':
    case 'paper1':
    case 'scissors1':
      winner = 'Player1'
      break
    case 'rock1paper2':
    case 'paper1scissors2':
    case 'scissors1rock2':
    case 'scissors2':
    case 'rock2':
    case 'paper2':
      winner = 'Player2'
  }
  return winner
}

function updateScore(winner) {
  if (winner === 'Player1') {
    player1 += 1
    playerOne.textContent = `You: ${player1}`
    playerOne.style.backgroundColor = 'green'
    playerTwo.style.backgroundColor = 'red'
  } else if (winner === 'Player2') {
    player2 += 1
    playerTwo.textContent = `Opponent: ${player2}`
    playerTwo.style.backgroundColor = 'green'
    playerOne.style.backgroundColor = 'red'
  } else {
    playerTwo.style.backgroundColor = 'yellow'
    playerOne.style.backgroundColor = 'yellow'
  }
}

function initModal(open) {
  document.querySelector('#close-modal').addEventListener('click', (e) => {
    initModal(false)
  })

  const modalCl = modal.classList

  if (open) {
    modalContainer.classList.remove('hidden')
    setTimeout(() => {
      modalCl.remove('opacity-0')
      modalCl.remove('-translate-y-full')
      modalCl.remove('scale-150')
    }, 100)
  } else {
    modalCl.add('-translate-y-full')
    setTimeout(() => {
      modalCl.add('opacity-0')
      modalCl.add('scale-150')
    }, 100)
    setTimeout(() => modalContainer.classList.add('hidden'), 300)
  }
}

function initChoices() {
  for (let i = 0; i < 3; i++) {
    const choice = document.createElement('img')
    choice.classList.add(
      'rounded-full',
      'hover:shadow-2xl',
      'active:ring',
      'active:ring-green-700',
      'sm:p-2',
      'h-16',
      'w-16',
      'lg:h-36',
      'lg:w-36',
      'md:h-28',
      'md:w-28',
      'sm:h-20',
      'sm:w-20'
    )
    choice.id = choices[i] + 1
    choice.src = choices[i] + '.png'
    document.getElementById('player1-choices').append(choice)
    choice.addEventListener('click', selectChoice)
  }
  if (numPlayers === 2) {
    for (let i = 0; i < 3; i++) {
      const choice2 = document.createElement('img')
      choice2.classList.add(
        'rounded-full',
        'hover:shadow-2xl',
        'active:ring',
        'active:ring-green-700',
        'sm:p-2',
        'h-16',
        'w-16',
        'lg:h-36',
        'lg:w-36',
        'md:h-28',
        'md:w-28',
        'sm:h-20',
        'sm:w-20'
      )
      choice2.id = choices[i] + 2
      choice2.src = choices[i] + '.png'
      document.getElementById('player2-choices').append(choice2)
      choice2.addEventListener('click', selectChoice)
    }
  }
}

function processChoices() {
  if (yourChoice && opponentChoice) {
    yourChoiceElement.src = yourChoice.slice(0, -1) + '.png'
    if (!yourChoiceElement.src.textContent === 'done.png') {
      console.log(yourChoiceElement.src)
      yourChoiceElement.style.transform = 'scaleX(-1)'
    }
    oppChoiceElement.src = opponentChoice.slice(0, -1) + '.png'
    const winner = selectWinner(yourChoice, opponentChoice)
    lastWinner = winner
    updateScore(winner)
    if (player1 >= 5 || player2 >= 5) {
      alert(`${lastWinner} is the WINNER!`)
      restart()
    } else {
      setTimeout(() => {
        yourChoice = ''
        opponentChoice = ''
        yourChoiceElement.src = 'rps.png'
        oppChoiceElement.src = 'rps.png'
        toggleButtons(true, btns1)
        toggleButtons(true, btns2)
      }, 1500)
    }
  }
}

;[...numPlayersElement.children].forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (btn.id === '1') {
      numPlayers = 1
    } else {
      numPlayers = 2
    }
    initModal(false)
    initChoices()
  })
})

document.querySelector('#restart').addEventListener('click', () => {
  restart()
})

function toggleButtons(enabled, btns) {
  btns = [...btns.children]
  if (enabled) {
    btns.forEach((btn) => {
      btn.classList.remove('hidden')
    })
  } else {
    btns.forEach((btn) => {
      btn.classList.add('hidden')
    })
  }
}

function save() {
  localStorage.setItem('numPlayers', numPlayers.toString())
  localStorage.setItem('player1', player1.toString())
  localStorage.setItem('player2', player2.toString())
  localStorage.setItem('lastWin', lastWinner)
}

function restart() {
  player1 = 0
  player2 = 0
  numPlayers = ''
  yourChoice = ''
  opponentChoice = ''
  playerOne.textContent = `You: 0`
  playerTwo.textContent = `Opponent: 0`
  playerTwo.style.backgroundColor = ''
  playerOne.style.backgroundColor = ''
  yourChoiceElement.src = 'rps.png'
  oppChoiceElement.src = 'rps.png'
  lastWinner = ''
  btns1.innerHTML = ''
  btns2.innerHTML = ''
  initModal(true)
}
