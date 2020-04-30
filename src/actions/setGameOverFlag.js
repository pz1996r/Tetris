export const setGameOverFlag = (boolean) => {
    return {
        type: 'SET_GAME_OVER_FLAG',
        payload: {
            gameOverFlag: boolean,
        }
    }
}
