import { handleResponse, handleError } from "./apiUtils";

export function getProjects(username) {
  return fetch(`http://localhost:4000/person/${username}`)
    .then(handleResponse)
    .catch(handleError);
}