import * as types from './actionTypes';
import * as signupApi from '../../api/signupApi';

export function signUp(username) {
  return function (dispatch) {
    console.log('inside signUp action');
    return signupApi
      .postSignUp(username)
      .then((data) => {
        dispatch(signUpSuccess(data.username));
      })
      .catch((error) => {
        throw error;
      });
  };
}

const signUpSuccess = (user) => {
  console.log('inside signUpSuccess action');
  return {
    type: types.SIGNUP_SUCCESS,
    payload: user,
  };
};

export function signIn(username, password) {
  return function (dispatch) {
    console.log('inside signIn action');
    return signupApi
      .postSignIn(username, password)
      .then((data) => {
        console.log(data);
        dispatch(signInSuccess(data.username));
      })
      .catch((error) => {
        throw error;
      });
  };
}

const signInSuccess = (user) => {
  console.log('inside signInSuccess action');
  return {
    type: types.SIGNIN_SUCCESS,
    payload: user,
  };
};
