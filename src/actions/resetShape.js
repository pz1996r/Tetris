export const resetShape = (shapes) => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    return {
        type: 'RESET_SHAPE',
        payload: {
            currentShape: randomShape,
        }

    }
}
