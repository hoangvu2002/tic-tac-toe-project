gameBoard = (function() {
    const board = [];
    rows = 3;
    columns = 3;
    for (let i = 0; i<rows; i++) {
        board[i] = [];
        for (let j=0; j<columns; j++) {
            board[i].push(cell());
        }
    }
    const getBoard = () => board;

    const availableCell = (board, row, column) => {
        //for (let i=0; i<rows; i++) {
        //    for (let j=0; j<columns; j++) {
        //        if (board[i][j].getValue() === 0) {
        //            return true;
        //        } else {
        //            return false
        //        }
        //    }
        //}
        if (board[row][column].getValue() === 0) {
            return true;
        } else {
            return false;}
    }

    const getColumn = (matrix, colIndex) => {
        return matrix.map(row => row[colIndex]);
    };

    const checkWinner = (displayController.getActivePlayer().value) => {
        for (let i=0; i<rows; i++) {
            if (board[i].every((cell) => cell.getValue()===displayController.getActivePlayer().value)) {
                console.log(`${displayController.getActivePlayer().name} is the winner`);
                resetGame();
            } 
        }

    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
    return {getBoard, availableCell, printBoard}
})();

function cell() {
    let value = 0;
    let cellRow;
    let cellColumn;

    const fill = (row, column, mark) => {
        value = mark;
        cellRow = row;
        cellColumn = column;
    }

    const getValue = () => value;

    return {fill, getValue}
}

function player(playerName, playerValue) {
    return {playerName, playerValue}
}

const displayController = (function() {
    const playerOneName = "Player one";
    const playerTwoName = "Player two";

    const players = [
        {
            name: playerOneName,
            value: "X",
        },
        {
            name: playerTwoName,
            value: "O",
        }
    ];

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(`${activePlayer.name}'s turn`);
        gameBoard.printBoard();
    }

    const playRound = (row, column) => {
        console.log(`${activePlayer.name} is ticking.`);
        mark = activePlayer.value;
        
        if (gameBoard.availableCell(gameBoard.getBoard(),row, column)) {
            gameBoard.getBoard()[row][column].fill(row, column, activePlayer.value);
        } else return;

        switchActivePlayer();
        gameBoard.printBoard();
    }

    return {playRound, getActivePlayer, switchActivePlayer}
})();