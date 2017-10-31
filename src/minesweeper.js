class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex)
    if(this._board.playerBoard[rowIndex][columnIndex] === "B"){
      console.log("Game is over!");
      this._board.print();
    }else if(!this._board.hasSafeTiles()){
      console.log("You have won!");
      this._board.print();
    }else{
      console.log("Current Board:");
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    }

    get playerBoard(){
      return this._playerBoard
    };

    flipTile(rowIndex, columnIndex){
      if(this._playerBoard[rowIndex][columnIndex] !== " "){
      return "This tile has already been flipped!"
    }else if (this._bombBoard[rowIndex][columnIndex] === "B") {
        this._playerBoard[rowIndex][columnIndex] = "B";
      }else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbotBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    };

    getNumberOfNeighbotBombs(rowIndex, columnIndex){
      const neighbourOffsets = [[-1, 1],[-1, 0],[-1, 1],[0 ,-1],[0, 1],[1, -1],[1, 0],[1, 1]];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
      neighbourOffsets.forEach(offset =>{const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
    if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
      if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === "B"){
        numberOfBombs++;
      }}});
      return numberOfBombs
    };

    hasSafeTiles(){
      return this._numberOfTiles !== this._numberOfBombs;
    };

    print(board){
      console.log(this._playerBoard.map(row => row.join(" | ") ).join("\n"));
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns){
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

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
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
  }

const g = new Game(3, 3, 3);
g.playMove(0, 0)
