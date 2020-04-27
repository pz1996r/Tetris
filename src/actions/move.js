export const move = (x, y, shape) => {
    return {
        type: 'MOVE',
        payload: {
            x,
            y,
            shape
        }
    }
}
