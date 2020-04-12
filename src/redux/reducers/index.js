import { combineReducers } from 'redux';
import projects from './projectReducers';

const rootReducer = combineReducers({
  projects,
});

export default rootReducer;
