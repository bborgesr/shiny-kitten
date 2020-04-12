import * as types from './actionTypes';
import * as projectApi from '../../api/projectApi';

export function createProject(project) {
  return { type: types.CREATE_PROJECT, project };
}

export function loadProjectsSuccess(projects) {
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function loadProjects(username) {
  return function (dispatch) {
    return projectApi
      .getProjects(username)
      .then((projects) => {
        dispatch(loadProjectsSuccess(projects));
      })
      .catch((error) => {
        throw error;
      });
  };
}
