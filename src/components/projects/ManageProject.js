import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as projectActions from '../../redux/actions/projectActions';

function ManageProject(props) {
  const history = useHistory();

  const username = props.location.state.username;
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
    history.push({
      pathname: '/projects',
      state: {
        username,
      },
    });
  };

  const onSave = (event) => {
    event.preventDefault();
    const otherProjects = props.projects.filter(
      (oldProject) => oldProject.id !== project.id
    );
    fetch(`http://localhost:4000/person/${username}/projects`, {
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
    fetch(`http://localhost:4000/person/${username}/projects`, {
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
      createdAt: new Date(),
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
    setNewToDo('');
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
    const thisToDo = todo;
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
    <div>
      <button className='btn btn-warning' onClick={goBack}>
        Go back
      </button>
      <h1>Manage project</h1>
      <h3>Project Name</h3>
      <input
        type='text'
        name='projectName'
        className='form-control'
        value={project.name}
        onChange={onNameChange}
      />
      <h3>ToDo</h3>
      <form onSubmit={handleToDoSubmit}>
        <label htmlFor='todo'>Add ToDo</label>
        <input
          type='text'
          name='todo'
          className='form-control'
          value={newToDo.name}
          onChange={handleToDoChange}
        />
        <input type='submit' value='Save ToDo' />
      </form>
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
            <th>Remove</th>
            <th>Done</th>
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
                    onDeleteButtonClick(item);
                  }}
                >
                  <i className='icon-trash'></i>
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
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Done</h3>
      <ul>
        {project.done.map((item) => (
          <li>{item.name}</li>
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
          Cancel Project
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

const mapDispatchToProps = {
  loadProjects: projectActions.loadProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProject);
