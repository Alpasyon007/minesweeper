const generatePlayerBoard = (numberOfRows, numberOfColumns) =>{
  let board = [];
  for(let r = 0; r < numberOfRows; r++){
    let row=[];
    for(let c = 0; c < numberOfColumns; c++){
      row.push(" ");
    }
    board.push(row);
  }
  return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) =>{
  let board = [];
  for(let r = 0; r < numberOfRows; r++){
    let row=[];
    for(let c = 0; c < numberOfColumns; c++){
      row.push(null);
    }
    board.push(row);
}
    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced<numberOfBombs){
      //will fix placing bombs on already existing bombs
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      board[randomRowIndex][randomColumnIndex] = "B";
      numberOfBombsPlaced++;
    }
  return board;
}

const printBoard = (board) =>{
  console.log(board.map(row => row.join(" | ") ).join("\n"))
}

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log("Player Board: ");
printBoard(playerBoard);
console.log("Bomb Board: ");
printBoard(bombBoard);
