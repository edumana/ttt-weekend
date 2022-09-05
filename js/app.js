/*-------------------------------- Constants --------------------------------*/
const board = document.getElementById('board')
const message = document.getElementById('message')
const reset = document.getElementById('reset-button')

/*---------------------------- Variables (state) ----------------------------*/
let gameState = new Array(9).fill(undefined)
let numValidEntries = 0
let winFlag = false

/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener('click', function(e){
  let click = parseInt(e.target.id, 10)
  gameState[click] === undefined ? validEntry(click) : alert('Square taken already!')
})

reset.addEventListener('click', function(e){
  gameState = new Array(9).fill(undefined)
  numValidEntries = 0
  console.log(document.querySelectorAll('.entry'))
  document.querySelectorAll('.entry').forEach(element => {element.remove()})
  board.style.pointerEvents = "auto"
  message.innerHTML = "Click a Square:"
  winFlag = false
})

/*-------------------------------- Functions --------------------------------*/
function validEntry(click){
  numValidEntries = 10 - gameState.filter(x => x === undefined).length
  numValidEntries % 2 === 0 ? draw(click, "X") : draw(click, "O")
}

function draw(square, char){
  gameState[square] = char
  
  let entry = document.createElement('h1')
  entry.className = "entry"
  entry.id = "sq"+square

  if (char === 'X'){
    entry.appendChild(document.createTextNode('X'))
    message.innerHTML = "O's turn"
  } else {
    entry.appendChild(document.createTextNode('0'))
    message.innerHTML = "X's turn"
  }

  document.getElementById(square).appendChild(entry)
  
  checkLogic()
}

function checkLogic(){
  
  //Check cat's game
  console.log(numValidEntries)

  //Check Horizontal
  const row1 = gameState.slice(0,3).join('')
  const row2 = gameState.slice(3,6).join('')
  const row3 = gameState.slice(6,9).join('')

  if(row1 === "XXX" || row1 === "OOO"){
    winAndEnd("row 1", row1.slice('')[0])
  } else if (row2 === "XXX" || row2 === "OOO"){
    winAndEnd("row 2", row2.slice('')[0])
  } else if (row3 === "XXX" || row3 === "OOO"){
    winAndEnd("row 3", row3.slice('')[0])
  }

  //Check vertical
  const col1 = [0,3,6].map(x => gameState[x]).join('')
  const col2 = [1,4,7].map(x => gameState[x]).join('')
  const col3 = [2,5,8].map(x => gameState[x]).join('')
  
  if(col1 === "XXX" || col1 === "OOO"){
    winAndEnd("col 1", col1.slice('')[0])
  } else if (col2 === "XXX" || col2 === "OOO"){
    winAndEnd("col 2", col2.slice('')[0])
  } else if (col3 === "XXX" || col3 === "OOO"){
    winAndEnd("col 3", col3.slice('')[0])
  }
  //Check Diagonal
  const dia1 = [0,4,8].map(x => gameState[x]).join('')
  const dia2 = [2,4,6].map(x => gameState[x]).join('')

  if(dia1 === "XXX" || dia1 === "OOO"){
    winAndEnd("diagonal left", col1.slice('')[0])
  } else if (dia2 === "XXX" || dia2 === "OOO"){
    winAndEnd("diagonal right", col2.slice('')[0])
  }

  if (numValidEntries === 9 && winFlag === false){
    message.innerHTML = "cat's game!"
    gameState = new Array(9).fill(undefined)
    numValidEntries = 0
    winFlag = false
    console.log(document.querySelectorAll('.entry'))
    document.querySelectorAll('.entry').forEach(element => {element.remove()})
    board.style.pointerEvents = "auto"
  }
}

function winAndEnd(line, char){
  winFlag = true
  message.innerHTML = `${char} won in ${line}`
  board.style.pointerEvents = "none"

  console.log(line)
  switch(line){
    case 'row 1': 
      document.getElementById('sq0').style.color = "#FF0000";
      document.getElementById('sq1').style.color = "#FF0000";
      document.getElementById('sq2').style.color = "#FF0000";
    break;
    case 'row 2': 
      document.getElementById('sq3').style.color = "#FF0000";
      document.getElementById('sq4').style.color = "#FF0000";
      document.getElementById('sq5').style.color = "#FF0000";
    break;
    case 'row 3': 
      document.getElementById('sq6').style.color = "#FF0000";
      document.getElementById('sq7').style.color = "#FF0000";
      document.getElementById('sq8').style.color = "#FF0000";
    break;
    case 'col 1':
      document.getElementById('sq0').style.color = "#FF0000";
      document.getElementById('sq3').style.color = "#FF0000";
      document.getElementById('sq6').style.color = "#FF0000";
    break;
    case 'col 2':
      document.getElementById('sq1').style.color = "#FF0000";
      document.getElementById('sq4').style.color = "#FF0000";
      document.getElementById('sq7').style.color = "#FF0000";
    break;
    case 'col 3':
      document.getElementById('sq2').style.color = "#FF0000";
      document.getElementById('sq5').style.color = "#FF0000";
      document.getElementById('sq8').style.color = "#FF0000";
    break;
    case 'diagonal right':
      document.getElementById('sq2').style.color = "#FF0000";
      document.getElementById('sq4').style.color = "#FF0000";
      document.getElementById('sq6').style.color = "#FF0000";
    break;
    case 'diagonal left':
      document.getElementById('sq0').style.color = "#FF0000";
      document.getElementById('sq4').style.color = "#FF0000";
      document.getElementById('sq8').style.color = "#FF0000";
    break;
  }

}
