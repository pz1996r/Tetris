import { resetShape } from '../actions/resetShape';
import { resetColor } from '../actions/resetColor';

export const newGameMiddleware = (store) => (next) => (action) => {
    const state = store.getState();
    if (action.type === 'CREATE_NEW_BOARD') {
        next(resetShape(state.boardSettings.shapes));
        next(resetColor(state.boardSettings.colors));
        next(action);
    } else {
        next(action);
    }

}