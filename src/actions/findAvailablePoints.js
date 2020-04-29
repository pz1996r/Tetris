export const findAvailablePoints = (state) => {
    state = state.getState().board
    let board = JSON.stringify(state.boardView);
    board = JSON.parse(board);
    const score = state.score;

    let pointsAmount = score;
    board.forEach((tab, i) => {
        const points = tab.some((pixel) => (pixel === 0));
        if (!points) {
            const row = [];
            row.length = tab.length;
            row.fill(0, 0, row.length);

            pointsAmount += tab.length;
            console.log(board.splice(i, 1))
            board.unshift(row);
            pointsAmount += tab.length;
        }
    });
    return {
        type: 'UPDATE_POINTS',
        payload: {
            boardView: board,
            score: pointsAmount
        }
    }
}
