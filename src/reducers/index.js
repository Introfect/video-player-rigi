// reducers/index.js
import { combineReducers } from 'redux';
import playlistReducer from './playlistReducer';

const rootReducer = combineReducers({
  playlist: playlistReducer,
});

export default rootReducer;
