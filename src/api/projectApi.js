import { handleResponse, handleError } from './apiUtils';

import { API_BASE_URL } from '../constants';

export function getProjects(username) {
  return fetch(`${API_BASE_URL}/person/${username}`)
    .then(handleResponse)
    .catch(handleError);
}
