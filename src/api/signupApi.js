import { handleResponse, handleError } from './apiUtils';

import { API_BASE_URL } from '../constants';

export function postSignUp(username, password) {
  return fetch(`${API_BASE_URL}/person`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function postSignIn(username, password) {
  return fetch(`${API_BASE_URL}/person/${username}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(handleResponse)
    .catch(handleError);
}
