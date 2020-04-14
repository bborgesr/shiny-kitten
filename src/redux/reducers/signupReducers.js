import * as types from '../actions/actionTypes';

export default function signupReducer(state = {}, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.SIGNIN_SUCCESS: {
      console.log('inside signUp/In reducer');
      console.log(action.payload);
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
}
