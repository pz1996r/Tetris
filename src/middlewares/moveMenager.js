import { resetShape } from '../actions/resetShape';
import { resetCordinates } from '../actions/resetCordinates';
import { putBlock } from '../actions/putBlock';
import { resetColor } from '../actions/resetColor';
import { findAvailablePoints } from '../actions/findAvailablePoints';
import isObject from '../common/isObject';

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
                if (prevX >= 0 && prevY >= 0 && !antyCliner.includes(`[${prevX},${prevY}]`) && board[prevY] && isObject(board[prevY][prevX])) {
                    board[prevY][prevX] = 0;
                }
                // filling
                if (cordX >= 0 && cordY >= 0 && board[cordY] && ((board[cordY][cordX] && board[cordY][cordX].falling === true) || board[cordY][cordX] === 0)) {
                    board[cordY][cordX] = { color: state.currentColor, falling: true };
                    antyCliner.push(`[${cordX},${cordY}]`);
                } else {
                    if (cordY >= 0) {
                        switch (action.payload.direction) {
                            case 'LEFT': cantMoveFlag = 'LEFT_FORBIDDEN'; break;
                            case 'RIGHT': cantMoveFlag = 'RIGHT_FORBIDDEN'; break;
                            default: cantMoveFlag = 'DOWN_FORBIDDEN'; break;
                        }
                    }
                }
            }
        })
    })
    return cantMoveFlag || {
        boardView: board,
        currentBlock: { x: action.payload.x, y: action.payload.y },
    }
}

export const moveMenagerMiddleware = (store) => (next) => (action) => {
    // Middleware responsible for movmend of the block in case when the move is forbidden (left and right: middleware doesn't push action to the reducer)
    // Case move is forbidden and the direction is down pushing actions like checking Points, setting new Position of the block and setting new shape of the block
    const state = store.getState();
    const modifyAction = { ...action };
    if (action.type === 'MOVE') {
        const canMoveResult = canMove(action, store);
        switch (canMoveResult) {
            case 'LEFT_FORBIDDEN': break;
            case 'RIGHT_FORBIDDEN': break;
            case 'DOWN_FORBIDDEN':
                next(putBlock(store));
                next(findAvailablePoints(store));
                next(resetCordinates(state.boardSettings.initialBlockCordinates));
                next(resetShape(state.boardSettings.shapes));
                next(resetColor(state.boardSettings.colors));
                break;

            default: modifyAction.payload = { ...canMoveResult }; next(modifyAction); break;
        }
    } else {
        next(action);
    }
}