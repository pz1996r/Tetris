export const resetColor = (colors) => {
    const currentColor = colors[Math.floor(Math.random() * colors.length)];
    return {
        type: 'RESET_COLOR',
        payload: {
            currentColor
        }
    }
}
