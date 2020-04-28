export const createNewBoard = (rows, columns, currentShape) => {
    return {
        type: 'CREATE_NEW_BOARD',
        payload: {
            rows,
            columns,
            currentShape
        }
    }
}
