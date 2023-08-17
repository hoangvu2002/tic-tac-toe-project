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
        for (let i=0; i<rows; i++) {
            for (let j=0; j<columns; j++) {
                if (board[i][j] === 0) {
                    return true;
                } else {
                    return false
                }
            }
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
    return {getBoard, availableCell}
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


})()