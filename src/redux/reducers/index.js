import { combineReducers } from 'redux';
import projects from './projectReducers';
import signup from './signupReducers';

const rootReducer = combineReducers({
  projects,
  signup,
});

export default rootReducer;
