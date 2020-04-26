import { combineReducers } from 'redux';
import { boardSettingsReducer } from './boardSettingsReducer';
import { boardReducer } from './boardReducer';

const rootReducer = combineReducers({ boardSettings: boardSettingsReducer, board: boardReducer });

export default rootReducer;