const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')

let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let intervalTime = 800
let speed = 0.9
let timerId = 0

function createGrid () {
  for (let i=0; i<width*width; i++) {
  const square = document.createElement('div')
  square.classList.add('square')
  grid.appendChild(square)
  squares.push(square)
  }
}
createGrid()

currentSnake.forEach(snakepart => squares[snakepart].classList.add('snake'))

function startGame() {
  //remove snake
  currentSnake.forEach(snakepart => squares[snakepart].classList.remove('snake'))
  //remove apple
  squares[appleIndex].classList.remove('apple')
  //resent variables
  clearInterval(timerId)
  currentSnake = [2,1,0]
  score = 0
  // re add new score to browser
  scoreDisplay.textContent = score
  direction = 1
  intervalTime = 800
  //new apple
  generateApples()
  //re add class of snake to new currentSnake
  currentSnake.forEach(snakepart => squares[snakepart].classList.add('snake'))
  //start move
  timerId = setInterval(move, intervalTime)
}


function move() {

if (
    (currentSnake[0] + width >= width*width && direction === width) || // hit bottom
    (currentSnake[0] % width === width-1 && direction === 1) || // hit right
    (currentSnake[0] % width === 0 && direction === -1) || // hit left
    (currentSnake[0] - width < 0 && direction === -width) || // hit top
    squares[currentSnake[0] + direction].classList.contains('snake')
)
return clearInterval(timerId)

  const tail = currentSnake.pop()
  squares[tail].classList.remove('snake')
  currentSnake.unshift(currentSnake[0] + direction)

 // if snake eats apple 
if (squares[currentSnake[0]].classList.contains('apple')) {
 //remove apple
squares[currentSnake[0]].classList.remove('apple')
 // grow snake by one square, adding class snake
squares[tail].classList.add('snake')
 // grow snake array
currentSnake.push(tail)
 // generate new apple
generateApples()
 // add one to the score
score ++
// display new score
scoreDisplay.textContent = score
 //speed up the snake
clearInterval (timerId)
intervalTime = intervalTime * speed
timerId = setInterval(move, intervalTime)
}
  squares[currentSnake[0]].classList.add('snake')
}


function control(e) {
  if (e.keyCode === 39) {
    console.log('right')
    direction = 1
  } else if (e.keyCode === 38) {
    console.log('up')
      direction = - width
    } else if (e.keyCode === 37) {
      console.log('left')
      direction = -1
    } else if (e.keyCode === 40) {
      console.log('down')
      direction = + width 
  }
}


function generateApples() {
  do {
    appleIndex = Math.floor(Math.random()*squares.length)
  } while (squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple')
}
generateApples()


document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)



// setInterval (function without (), time in ms)
// const timerId = setInterval (function, time)

