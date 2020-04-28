import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const canMove = (action, state) => {
    state = state.getState().board
    let board = JSON.stringify(state.boardView);
    board = JSON.parse(board);
    // to nie działa, nie mogę dojść dlaczego : let board = [...state.boardView];
    let cantMoveFlag = false;
    const antyCliner = []
    action.payload.shape.forEach((tab, y) => {
        tab.forEach((block, x) => {
            if (block !== 0) {
                const cordX = action.payload.x + x - 1;
                const cordY = action.payload.y + y - 1;
                const prevX = state.currentBlock.x + x - 1;
                const prevY = state.currentBlock.y + y - 1;
                // cleaning
                if (prevX >= 0 && prevY >= 0 && !antyCliner.includes(`[${prevX},${prevY}]`) && board[prevY] && board[prevY][prevX] === 99) {
                    board[prevY][prevX] = 0;
                }
                // filling
                // 0 empty fill | 99 folling pixel 
                if (cordX >= 0 && cordY >= 0 && board[cordY] && (board[cordY][cordX] === 0 || board[cordY][cordX] === 99)) {
                    board[cordY][cordX] = 99;
                    antyCliner.push(`[${cordX},${cordY}]`);
                } else {
                    if (cordY >= 0) {
                        switch (action.payload.direction) {
                            case 'LEFT': console.log('left'); cantMoveFlag = 'LEFT'; break;
                            case 'RIGHT': console.log('right'); cantMoveFlag = 'RIGHT'; break;
                            default: console.log('down'); cantMoveFlag = 'DOWN'; break;
                        }
                    }

                }
            }
        })

    })
    return cantMoveFlag || {
        // ...state,
        boardView: board,
        currentBlock: { x: action.payload.x, y: action.payload.y },
    }
}


const moveMenager = (store) => (next) => (action) => {
    const modifyAction = { ...action };
    if (action.type === 'MOVE') {
        const canMoveResult = canMove(action, store);
        switch (canMoveResult) {
            case 'LEFT': console.log('LEFT-BLOCK'); break;
            case 'RIGHT': console.log('RIGHT_BLOCK'); break;
            case 'DOWN': console.log('DOWN_BLOCK'); break;
            default: console.log('CAN_MOVE'); modifyAction.payload = { ...canMoveResult }; next(modifyAction);; break;
        }
    } else {
        next(action);
    }
    // next(action);
}
const store = createStore(rootReducer, {}, applyMiddleware(moveMenager));

export default store;