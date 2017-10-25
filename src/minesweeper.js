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
      if(board[randomRowIndex][randomColumnIndex] !== "B"){
        board[randomRowIndex][randomColumnIndex] = "B";
        numberOfBombsPlaced++;
      }
    }
  return board;
}

const getNumberOfNeighbotBombs = (bombBoard, rowIndex, columnIndex) =>{
  const neighbourOffsets = [[-1, 1],[-1, 0],[-1, 1],[0 ,-1],[0, 1],[1, -1],[1, 0],[1, 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighbourOffsets.forEach(offset =>{const neighborRowIndex = rowIndex + offset[0];
  const neighborColumnIndex = columnIndex + offset[1];
if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
  if(bombBoard[neighborRowIndex][neighborColumnIndex] === "B"){
    numberOfBombs++;
  }}});
  return numberOfBombs
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) =>{
  if(playerBoard[rowIndex][columnIndex] !== " "){
  return "This tile has already been flipped!"
  }else if (bombBoard[rowIndex][columnIndex] === "B") {
    playerBoard[rowIndex][columnIndex] = "B";
  }else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighbotBombs(bombBoard, rowIndex, columnIndex);
  }
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

flipTile(playerBoard, bombBoard, 0, 0)
console.log("Updated Player Board: ");
printBoard(playerBoard);
