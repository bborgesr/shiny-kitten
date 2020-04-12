import * as types from '../actions/actionTypes';

export default function projectReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_PROJECT: {
      const newState = [...state, action.project];
      return newState;
    }
    case types.LOAD_PROJECTS_SUCCESS:
      return action.projects;
    default:
      return state;
  }
}
