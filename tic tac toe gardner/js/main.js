class MakePlayer{
  constructor(exOrOh, playerTurn){
  this.selections = []                        //stores the id of the 
  this.exOrOh = exOrOh                        //player marker
  this.playerTurn = playerTurn
  } 
  
  makeMove(boxIndex) {              //shouldn't these be id value rather than boxIndex?
  this.selections.push(boxIndex)    //same here
  } 
}

let playerN = new MakePlayer ('N', true)        //the string 'X' and the first turn
let playerO = new MakePlayer ('O', false)       //the sting 'o' and the second turn
let winnerMessage = document.querySelector('.whoWon')
let turnCount = 0
let currentPlayer = playerN          
let playerText = document.querySelector('#whichPlayer') 
playerText.innerText = currentPlayer.exOrOh                    
let showTurn = document.querySelector('.showTurn') 
const boxValue = document.querySelector('.boxes')    //placing section(.boxes) containing the 9 squares into variable boxValue
boxValue.addEventListener('click', boxClicked)   //placing addEventListener on boxValue: click event - boxClicked runs
let clear = document.querySelector('#clear')
clear.addEventListener('click', resetGame)

function boxClicked(e){                     //e as a parameter means this function requires e(event) to run
  if((e.target.innerText === '') && (turnCount < 9)){ 
    turnCount++
    console.log(turnCount)//if the target of the event is an empty string, execute these instructions:
    e.target.innerText = currentPlayer.exOrOh   //currentPlayer's exOrOh value in the target's innerText - first turn = the string 'X'
    if(currentPlayer === playerO){
      e.target.classList.add('orange')
    }
  }

  let idValue = Number(e.target.getAttribute('id')); 
  currentPlayer.makeMove(idValue) //executes makeMove on the currentPlayer - makeMove is pushing the idValue into the selections array
    checkWin()                    //calling checkWin() function - jump to checkWin()
    if(checkWin() === true ){
      console.log(`Player ${currentPlayer.exOrOh} wins`)
      winnerMessage.innerText = `Player ${currentPlayer.exOrOh} wins` 
      boxValue.classList.add('hide')
      showTurn.classList.add('hide')
    } else{
      changePlayer()                //calling changePlayer() function - jump to changePlayer()
    }
}

function changePlayer (){
  console.log('changePlayer')
  if(currentPlayer === playerN){      //Our currentPlayer always starts as playerX, so if no one has one after(duh), we switch
      currentPlayer = playerO
    }else{
      currentPlayer = playerN         //keeps the other player from putting down a marker - it stays currentPlayer's turn
    }  
    playerText.innerText = currentPlayer.exOrOh
}

function checkWin(){
  let winStatus = false              //winStatus reflects the state of the game - beginning of game has no winner, so false
  // console.log(winningConditions)     //just providing a visual
  // console.log(currentPlayer.selections)  //twinsies
  winningConditions.forEach(condition => { //jump to winningConditions - we are going to perform these actions on each condition   
    let matchList = condition.filter(boxNumber => currentPlayer.selections.includes(boxNumber)) 

//we are filtering through each condition by taking each boxNumber(element in the condition array) and placing it in the .includes() method as an argument. The .includes() method(which returns a boolean value) then takes the boxNumber and runs through every element in the currentPlayer's selections array(the array logging the id number of every box into which they've placed a marker), only taking those that match. The matched numbers are taken by the .filter() method and placed into an array (this method works by taking elements that fulfill the requirements and creating a new array) This new array is then stored by the matchList variable..

      if(matchList.length === 3){   //each winningConditions array has three elements inside, so you must match all three to win.
        winStatus = true            //if your matchList === 3, then we flip winStatus to true and you've won!
        return true                 //idk why these are here tbh because where are we returning this?
      }else if((turnCount === 9) && (winStatus === false)){
        console.log('draw')
        winnerMessage.innerText='DRAW!'
        boxValue.classList.add('hide')
        showTurn.classList.add('hide')
      }
    })
  return winStatus                 
} 

function resetGame() {
  window.location.reload()
}

// function resetGame() {
//   turnCount = 0
//   winStatus = false
//   let eachBox = document.querySelectorAll('.box')
//   eachBox.forEach(box =>  box.innerText = '')
// }

let winningConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]] //all possible winning combinations



