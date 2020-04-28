const stopFalling = (state) => {
    state = state.getState().board
    let board = JSON.stringify(state.boardView);
    board = JSON.parse(board);

    state.currentShape.forEach((tab, y) => {
        tab.forEach((block, x) => {
            if (block !== 0) {
                const cordX = state.currentBlock.x + x - 1;
                const cordY = state.currentBlock.y + y - 1;
                board[cordY][cordX] = { color: board[cordY][cordX].color, falling: false };
            }
        })
    })
    return { boardView: board }
}

export const putBlock = (state) => {
    const response = stopFalling(state);
    return {
        type: 'PUT_BLOCK',
        payload: {
            ...response
        }

    }
}


