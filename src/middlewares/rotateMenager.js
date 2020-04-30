import isObject from '../common/isObject';

const canRotate = (action, state) => {
    state = state.getState().board
    const shapeBeforeRotation = state.currentShape;
    let board = JSON.stringify(state.boardView);
    board = JSON.parse(board);

    let cantRotateFlag = false;
    const antyCliner = []
    shapeBeforeRotation.forEach((tab, y) => {
        tab.forEach((block, x) => {
            const prevX = state.currentBlock.x + x - 1;
            const prevY = state.currentBlock.y + y - 1;
            // logic
            console.log(action, '...', prevY, prevX);
            // if (action.payload.shape[prevY][prevX] !== 0) {
            if (action.payload.shape[y][x] !== 0) {
                if (prevX >= 0 && prevY >= 0 && board[prevY] && ((board[prevY][prevX] && board[prevY][prevX].falling === true) || board[prevY][prevX] === 0)) {
                    board[prevY][prevX] = { color: state.currentColor, falling: true };
                    antyCliner.push(`[${prevX},${prevY}]`);
                } else {
                    cantRotateFlag = 'FORBIDDEN';
                }
            }
            // cleaning
            if (block !== 0) {
                if (prevX >= 0 && prevY >= 0 && !antyCliner.includes(`[${prevX},${prevY}]`) && board[prevY] && isObject(board[prevY][prevX])) {
                    board[prevY][prevX] = 0;
                }
            }
        })
    })
    return cantRotateFlag || {
        boardView: board,
        currentShape: action.payload.shape
    }
}


export const rotateMenagerMiddleware = (store) => (next) => (action) => {
    const modifyAction = { ...action };
    if (action.type === 'ROTATE') {
        const canRotateResult = canRotate(action, store);
        switch (canRotateResult) {
            case 'FORBIDDEN': break;
            default: modifyAction.payload = { ...canRotateResult }; next(modifyAction); break;
        }
    } else {
        next(action);
    }
}