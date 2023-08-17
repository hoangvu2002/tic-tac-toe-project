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