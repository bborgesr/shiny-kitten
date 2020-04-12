import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as projectActions from '../../redux/actions/projectActions';

function ManageProject(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(props.location.state.project);
  const [newToDo, setNewToDo] = useState({ id: '', name: '', createdAt: '', doneAt: ''});
  const username = props.location.state.username;

  useEffect(() => {
    props
      .loadProjects(username)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
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
  };

  const onNameChange = (event) => {
    event.preventDefault();
    const projectValue = { ...project, name: event.target.value };
    setProject(projectValue);
  };

  const handleToDoChange = (event) => {
    event.preventDefault();
    setNewToDo(event.target.value);
  };

  const handleToDoSubmit = (event) => {
    event.preventDefault();
    const projectValue = {
      ...project,
      todos: [...project.todos, newToDo],
    };
    setProject(projectValue);
  };

  const onEditButtonClick = (item) => {
    console.log(item);
  };

  // const test = () => {
  //   console.log(project);
  // };

  return (
    <div>
      {/* <button type='button' onClick={test}>
          test
        </button> */}
      <button type='button' onClick={goBack} className='btn btn-primary'>
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
          value={newToDo}
          onChange={handleToDoChange}
        />
        <input type='submit' value='Save ToDo' />
      </form>
      <table className='table'>
        <thead>
          <tr>
            <th>ToDo</th>
            <th>Edit</th>
            <th>Remove</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {project.todos.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
              <td>
                <button
                  onClick={function () {
                    onEditButtonClick(item);
                  }}
                >
                  <i className='icon-edit'></i>
                </button>
              </td>
              <td>
                <button
                  onClick={function () {
                    // onDeleteButtonClick(item);
                  }}
                >
                  <i className='icon-trash'></i>
                </button>
              </td>
              <td>
                <button
                  onClick={function () {
                    // onDoneButtonClick(item);
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
          <li>{item}</li>
        ))}
      </ul>
      <button onClick={onSave}>Save Project</button>
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
