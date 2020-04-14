import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import * as projectActions from '../../redux/actions/projectActions';

import { API_BASE_URL } from '../../constants';

import './ManageProject.css';

function ManageProject(props) {
  const history = useHistory();

  const username = props.user;
  const [project, setProject] = useState(props.location.state.project);

  const [newToDo, setNewToDo] = useState({
    id: '',
    name: '',
    createdAt: '',
    doneAt: '',
  });
  const [toDoEdit, setToDoEdit] = useState('');

  useEffect(() => {
    props.loadProjects(username).catch((error) => {
      console.error('Loading projects failed: ' + error);
    });
  }, [props, username]);

  const goBack = () => {
    history.push('/projects');
  };

  const onSave = (event) => {
    event.preventDefault();
    const otherProjects = props.projects.filter(
      (oldProject) => oldProject.id !== project.id
    );
    fetch(`${API_BASE_URL}/person/${username}/projects`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...otherProjects, project]),
    });
    goBack();
  };

  const onDelete = () => {
    const otherProjects = props.projects.filter(
      (oldProject) => oldProject.id !== project.id
    );
    fetch(`${API_BASE_URL}/person/${username}/projects`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...otherProjects]),
    });
    goBack();
  };

  const onNameChange = (event) => {
    event.preventDefault();
    const projectValue = { ...project, name: event.target.value };
    setProject(projectValue);
  };

  const handleToDoChange = (event) => {
    event.preventDefault();
    const newToDoValue = {
      ...newToDo,
      id: new Date().toISOString(),
      name: event.target.value,
      createdAt: moment(),
    };
    setNewToDo(newToDoValue);
  };

  const handleToDoSubmit = (event) => {
    event.preventDefault();
    const projectValue = {
      ...project,
      todos: [...project.todos, newToDo],
    };
    setProject(projectValue);
  };

  const handleToDoEdit = (event) => {
    event.preventDefault();
    setToDoEdit(event.target.value);
  };

  const handleToDoEditSubmit = (todo) => {
    const updatedToDo = { ...todo, name: toDoEdit };
    const allToDos = project.todos.map((todo) => {
      if (todo.id === updatedToDo.id) return updatedToDo;
      else return todo;
    });
    const projectValue = {
      ...project,
      todos: allToDos,
    };
    setProject(projectValue);
    setToDoEdit('');
  };

  const onDeleteButtonClick = (todo) => {
    const thisToDo = todo;
    const allToDos = project.todos.filter((todo) => todo.id !== thisToDo.id);
    const projectValue = {
      ...project,
      todos: allToDos,
    };
    setProject(projectValue);
  };

  const onDoneButtonClick = (todo) => {
    const thisToDo = { ...todo, doneAt: moment() };
    const allToDos = project.todos.filter((todo) => todo.id !== thisToDo.id);
    const allDones = [...project.done, thisToDo];
    const projectValue = {
      ...project,
      todos: allToDos,
      done: allDones,
    };
    setProject(projectValue);
  };

  return (
    <div style={{ margin: '30px' }}>
      <button className='btn btn-warning' onClick={goBack}>
        Go back
      </button>
      <b style={{ color: '#112f50', display: 'block' }}>
        You must use this button to go back instead of the browser's.
      </b>
      <b style={{ color: '#112f50', display: 'block' }}>
        You must use click on "Save Project" to save your changes to the
        project.
      </b>
      <h1>Manage project</h1>
      <h4>Project Name</h4>
      <input
        type='text'
        name='projectName'
        className='form-control'
        value={project.name}
        onChange={onNameChange}
      />
      <h4>ToDo</h4>
      <form onSubmit={handleToDoSubmit}>
        <label htmlFor='todo'>Add ToDo</label>
        <input
          type='text'
          name='todo'
          className='form-control'
          value={newToDo.name}
          onChange={handleToDoChange}
        />
        <input type='submit' value='Save' className='btn btn-secondary' />
      </form>
      {project.todos.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              <th>ToDo</th>
              <th style={{ display: 'flex' }}>
                <p style={{ marginTop: '18px' }}>Edit Name</p>
                <input
                  style={{ marginTop: '10px', marginLeft: '15px' }}
                  type='text'
                  className='form-control'
                  value={toDoEdit}
                  onChange={handleToDoEdit}
                />
              </th>
              <th>Mark as Done</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {project.todos.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <button
                    onClick={function () {
                      handleToDoEditSubmit(item);
                    }}
                  >
                    <i className='icon-edit'></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={function () {
                      onDoneButtonClick(item);
                    }}
                  >
                    <i className='icon-thumbs-up'></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={function () {
                      onDeleteButtonClick(item);
                    }}
                  >
                    <i className='icon-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ''
      )}
      {project.done.length > 0 ? <h4>Done</h4> : ''}
      <ul className='done-items'>
        {project.done.map((item, index) => (
          <div key={index}>
            <li style={{ textDecoration: 'line-through' }}>
              {item.name}
              <span>{moment(item.doneAt).fromNow()}</span>
            </li>
          </div>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className='btn btn-success'
          onClick={onSave}
          style={{ marginRight: '20px' }}
        >
          Save Project
        </button>
        <button
          className='btn btn-danger'
          onClick={onDelete}
          style={{ marginRight: '20px' }}
        >
          Delete Project
        </button>
        <button className='btn btn-secondary' onClick={goBack}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
    user: state.signup.user,
  };
}

const mapDispatchToProps = {
  loadProjects: projectActions.loadProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProject);
