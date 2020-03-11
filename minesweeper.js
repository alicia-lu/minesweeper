document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    { row: 0, col: 0, isMine: false, hidden: true },
    { row: 0, col: 1, isMine: true, hidden: true },
    { row: 0, col: 2, isMine: true, hidden: true },
    { row: 1, col: 0, isMine: false, hidden: true },
    { row: 1, col: 1, isMine: true, hidden: true },
    { row: 1, col: 2, isMine: false, hidden: true },
    { row: 2, col: 0, isMine: true, hidden: true },
    { row: 2, col: 1, isMine: true, hidden: true },
    { row: 2, col: 2, isMine: false, hidden: true }
  ]
}

function startGame () {
  for(var i of board.cells) {
    i.surroundingMines = countSurroundingMines(i)
  }

  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin () { 

  /*!TEMPORARY 'ugly' SOLUTION...couldn't figure out ORIGINAL SOLUTION (i.e. instructions given - win condition criteria implementation became too confusing and frustrating because I'm sure it's easy...) Original try following instructions are commented out below */
  let win_mark_count = 0;
  let win_reveal_count = 0;

  for(var i of board.cells) {
    if(i.isMine === true) {
      win_mark_count++
    }

    if(i.isMine === false) {
      win_reveal_count++
    }
  }

  //console.log("count: " + win_mark_count + " " + win_reveal_count)

  let win_marked = 0;
  let win_revealed = 0;

  for(var i of board.cells) {
    if(i.isMine === true && i.isMarked === true && i.hidden === true) {
      win_marked++
    } else if(i.isMine === false && i.isMine === false && i.hidden === false) {
      win_revealed++
    }
  }

 //console.log("end: " + win_marked + " " + win_revealed)

if(win_revealed === win_reveal_count || 
  ((win_marked === win_mark_count) && (win_revealed === win_reveal_count))) { //NOTE: can't win just by marking bombs, the numbered squares must also be revealed. Essentially though, if display 'you win' when all bombs are marked, then it follows that the rest were number squares. 
  lib.displayMessage('You win!')
} 


  /* ORIGINAL SOLUTION FOLLOWING STEPS: but haven't figured out how to display message when ALL cells meet criteria rather than displaying after one cell meets the criteria...

  for(var i = 0; i < board.cells.length; i++) {
    if(i.isMine === true && i.isMarked === false) {
      return
    } else if(i.hidden === true && i.isMarked === true) {
      return
    } else {
      lib.displayMessage('You win!')
    }
  }
   // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    //lib.displayMessage('You win!') */
}



// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
    var mine_count = 0;
    var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
    for(var i in surroundingCells) {
      if(surroundingCells[i].isMine === true) {
        mine_count++
      }
    }
    return mine_count
}

