const initialState = {
    boardView: [],
    currentBlock: { x: 9, y: -2 },
    currentShape: [],
    currentColor: '',
    score: 0,
    gameOverFlag: false,
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
                score: 0,
            }
        case 'MOVE': return {
            ...state,
            ...action.payload
        }
        case 'RESET_SHAPE': return {
            ...state,
            currentShape: action.payload.currentShape,
        }
        case 'RESET_CORDINATES': return {
            ...state,
            currentBlock: action.payload.cordinates
        }
        case 'PUT_BLOCK': return {
            ...state,
            ...action.payload
        }
        case 'RESET_COLOR': return {
            ...state,
            ...action.payload
        }
        case 'UPDATE_POINTS': return {
            ...state,
            ...action.payload
        }
        case 'ROTATE': return {
            ...state,
            ...action.payload
        }
        case 'SET_GAME_OVER_FLAG': return {
            ...state,
            ...action.payload
        }
        default: return state;
    }
}
