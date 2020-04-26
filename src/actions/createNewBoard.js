export const createNewBoard = (rows, columns) => {
    return {
        type: 'CREATE_NEW_BOARD',
        payload: {
            rows,
            columns
        }
    }
}
