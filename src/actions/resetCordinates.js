export const resetCordinates = (cordinates) => {
    return {
        type: 'RESET_CORDINATES',
        payload: {
            cordinates
        }

    }
}