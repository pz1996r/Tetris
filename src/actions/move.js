export const move = (x, y, shape, direction) => {
    return {
        type: 'MOVE',
        payload: {
            x,
            y,
            shape,
            direction
        }
    }
}
