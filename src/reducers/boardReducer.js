const initialState = {
    boardView: [],
    currentBlock: { x: 9, y: -2 },
    currentShape: [],
    score: 0,
}

const createTetrisBoard = (rows, columns) => {
    const row = [];
    const board = [];
    row.length = rows;
    board.length = columns;
    row.fill(0, 0, row.length);
    board.fill(row, 0, columns.length);
    return board;
}

export const boardReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case 'CREATE_NEW_BOARD':
            return {
                ...state,
                boardView: createTetrisBoard(action.payload.rows, action.payload.columns),
                currentShape: action.payload.currentShape,
                score: 0,
            }
        case 'MOVE': return {
            ...state,
            ...action.payload
        }
        default: return state;
    }
}
