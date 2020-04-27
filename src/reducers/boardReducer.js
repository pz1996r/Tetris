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
    row.fill(null, 0, row.length);
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
        case 'MOVE': {
            let board = JSON.stringify(state.boardView);
            board = JSON.parse(board);

            // let board = [...state.boardView];

            const antyCliner = []
            action.payload.shape.forEach((tab, y) => {
                tab.forEach((block, x) => {
                    if (block !== 0) {
                        // console.log('center x:' + action.payload.x + 'center y: ' + action.payload.y + ' counted x: ' + (action.payload.x + x - 1) + ' counted y: ' + (action.payload.y + y - 1));
                        const cordX = action.payload.x + x - 1;
                        const cordY = action.payload.y + y - 1;
                        const prevX = state.currentBlock.x + x - 1;
                        const prevY = state.currentBlock.y + y - 1;
                        // cleaning
                        if (prevX >= 0 && prevY >= 0) {
                            if (!antyCliner.includes(`[${prevX},${prevY}]`)) {
                                board[prevY][prevX] = 0;
                            }
                        }
                        // filling
                        if (cordX >= 0 && cordY >= 0) {
                            board[cordY][cordX] = 99;
                            antyCliner.push(`[${cordX},${cordY}]`);
                        }
                    }
                    // czyszczenie również tutaj !!!
                })

            })
            return {
                ...state,
                boardView: board,
                currentBlock: { x: action.payload.x, y: action.payload.y },
            }
        }
        default: return state;
    }
}
