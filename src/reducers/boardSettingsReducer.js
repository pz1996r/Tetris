const initialState = {
    rows: 18,
    columns: 26,
    initialBlockCordinates: { x: 9, y: -2 },
    pause: true,
    colors: ['red', 'green', 'blue', 'pink', 'yellow', 'orange'],
    shapes: [
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 0],
            [0, 1, 0],
            [1, 1, 1]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [1, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
    ]
}
export const boardSettingsReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case 'PAUSE':
            return { ...state, pause: true };
        case 'PLAY':
            return { ...state, pause: false };
        default: return state;
    }
}

// wylosować guzik
// uswawić pozycję guzika na górę
// wylosować kolor