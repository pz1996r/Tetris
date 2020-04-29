import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { moveMenagerMiddleware } from '../middlewares/moveMenager';
import { newGameMiddleware } from '../middlewares/newGameMenager';

const middleware = [newGameMiddleware, moveMenagerMiddleware];
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

export default store;