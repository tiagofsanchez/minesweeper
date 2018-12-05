class Game {
  constructor(numberRows, numberColumns, numberOfBombs) {
    this._board = new Board (numberRows, numberColumns, numberOfBombs);
  }
  //====Methods ====
  playMove (rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      return `The game is over!!!`;
      this._board.print();
    } else if (!this.board.hasSafeTiles()) {
      return `CONGRATS, you HAVE WON!!!`
  } else {
    return `Current Board:`;
    this._board.print();
    }
  }
}

class Board {
  constructor(numberRows, numberColumns, numberOfBombs) {
    this._numberRows = numberRows;
    this._mumberColumns = numberColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberColumns * numberRows;
    this._playboard = Board.generatePlayerBoard (numberRows, numberColumns);
    this._bombBoard = Board.generateBombBoard (numberRows,numberColumns,numberOfBombs);
  }

  get playerBoard() {
    return this._playboard;
  }

// ===== METHOD =====

 flipTile (flipRow,flipColumn) {
    if (this._playerBoard[flipRow][flipColumn] !== ' ') {
      return;
    } else if (this._bomBoard[flipRow][flipColumn] === 'B') {
      this._playerBoard[flipRow][flipColumn] = 'B';
    } else {this._playerBoard[flipRow][flipColumn] = this.getNumberOfNeighborBombs(flipRow,flipColumn);}
    return;
    this._numberOfTiles--;
  }



  // a funcao mais dificil de todas, preciso de voltar aqui
  getNumberOfNeighborBombs (flipRow,flipColumn) {
    const offsets = [[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,0],[-1,1],[-1,-1]];
    const numberRows = this._bomBoard.length;
    const numberColumns = this._bomBoard[0].length;
    let numberOfBombs = 0;
    offsets.forEach( offset => {
      const neighborRow = flipRow + offset[0];
      const neighborColumn = flipColumn + offset[1];
      if (neighborRow >= 0 && neighborRow < numberRows && neighborColumn >= 0 && neighborColumn < numberColumns ) {
        if (this._bomBoard[neighborRow][neighborColumn] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles () {
    return this._numberOfTiles !== this._numberOfBombs;
    }

  print() {
      console.log(this._playboard.map(row => row.join(' | ')).join('\n'));
    }

  static generatePlayerBoard (numberRows, numberColumns) {
      let board = [];
      for (let r = 0; r < numberRows; r++) {
        let row = [];
        for (let c = 0; c< numberColumns; c++) {
          row.push(' ');
        };
        board.push(row);
      };
      return board;
    }

    static generateBombBoard (numberRows, numberColumns, numberOfBombs) {
      let board = [];
      for (let r = 0; r < numberRows; r ++) {
        let row = [];
        for (let c = 0; c < numberColumns; c++) {
          row.push(null);
        }
        board.push(row);
      };
      let numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random()*numberRows);
        let randomColumnIndex = Math.floor(Math.random()*numberColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced+=1;
        };
      };
      return board;
    }
}



const g = new Game (3,3,3);
g.playMove(0,0);



// NOTE: All the typing needed before the clases

/*const playerBoard = generatePlayerBoard (3,3);
console.log("Payers Board:");
printBoard(playerBoard);
const bomBoard = generateBombBoard (3,3,5);
console.log("Bomb Board:");
printBoard(bomBoard);
console.log("You have played here:");
flipTile(playerBoard, bomBoard, 2, 2);
printBoard(playerBoard)
console.log("You have played here:");
flipTile(playerBoard, bomBoard, 1, 1);
printBoard(playerBoard) */
