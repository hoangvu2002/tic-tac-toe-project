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

    const resetGame = () => {
        for (let i=0; i<rows; i++) {
            for (let j=0; j<columns; j++) {
                board[i][j] = cell();
            }
        }
    }

    const checkWinner = (value) => {
        for (let i=0; i<rows; i++) {
            if (board[i].every((cell) => cell.getValue()===value)) {
                console.log(`${displayController.getActivePlayer().name} is the winner`);
                resetGame();
            } 
        }

        for (let j=0; j<columns; j++) {
            if (getColumn(board,j).every((cell) => cell.getValue()===value)) {
                console.log(`${displayController.getActivePlayer().name} is the winner`);
                resetGame();
            }
        }

        const firstDiagonal = [];
        const secondDiagonal = [];
        for (let i=0; i<rows; i++) {
            firstDiagonal.push(board[i][i].getValue());
            secondDiagonal.push(board[i][2-i].getValue());
        }
        if ((firstDiagonal.every((cell) => cell===value))||(secondDiagonal.every((cell) => cell===value))) {
            console.log(`${displayController.getActivePlayer().name} is the winner`);
            resetGame();
        }
        //Add logic for the draw case
        const allCells = [];
        for (let i=0; i<rows; i++) {
            for (let j=0; j<columns; j++) {
                allCells.push(board[i][j].getValue());
            }
        }
        if (allCells.every((cell) => cell !== 0)) {
            console.log("Draw");
            resetGame();
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
    return {getBoard, availableCell, printBoard, checkWinner}
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
            gameBoard.checkWinner(activePlayer.value);
        } else return;

        switchActivePlayer();
        gameBoard.printBoard();
    }

    return {playRound, getActivePlayer, switchActivePlayer}
})();

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {    
    cell.onclick = () => {
        cell.setAttribute('data-value',displayController.getActivePlayer().value)
        displayController.playRound(Number(cell.dataset.row),Number(cell.dataset.column));
        updateMark(cell);
    }
});

const updateMark = (cell) => {
    //cells.forEach((cell) => {
        if (cell.dataset.value === "X") {
            const xMark = document.createElement('img');
            xMark.src = "kisspng-x-mark-symbol-computer-icons-clip-art-w-5aea1368bab3e2.5041694515252898327647.png";
            cell.appendChild(xMark);
        }
        else if (cell.dataset.value === "O") {
            const oMark = document.createElement("img");
            oMark.src = "pngimg.com - letter_o_PNG116.png";
            cell.appendChild(oMark);
        }
        else {
            cell.removeChild(cell.firstChild)
        }
    //})
}