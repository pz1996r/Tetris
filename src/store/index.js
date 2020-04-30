import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { moveMenagerMiddleware } from '../middlewares/moveMenager';
import { newGameMiddleware } from '../middlewares/newGameMenager';
import { rotateMenagerMiddleware } from '../middlewares/rotateMenager';

const middleware = [newGameMiddleware, moveMenagerMiddleware, rotateMenagerMiddleware];
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

export default store;