import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as projectActions from '../../redux/actions/projectActions';
import ProjectList from './ProjectsList';

function Projects(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props
      .loadProjects(props.location.state.username)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Loading projects failed: ' + error);
      });
  }, [props]);

  const [project, setProject] = useState({
    id: '',
    name: '',
    todos: [],
    done: [],
  });

  const handleChange = (event) => {
    event.preventDefault();
    const projectValue = {
      ...project,
      name: event.target.value,
      id: new Date().toISOString(),
    };
    setProject(projectValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `http://localhost:4000/person/${props.location.state.username}/projects`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...props.projects, project]),
      }
    );
  };

  return (
    <div style={{ margin: '30px' }} className='container'>
      {loading ? (
        'Loading'
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Projects</h1>
          <label htmlFor='projectName'>Add Project</label>
          <input
            type='text'
            name='projectName'
            className='form-control'
            value={project.name}
            onChange={handleChange}
          />
          <input type='submit' value='Save' className='btn btn-secondary' />
          <ProjectList
            projects={props.projects}
            username={props.location.state.username}
          />
        </form>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

const mapDispatchToProps = {
  createProject: projectActions.createProject,
  loadProjects: projectActions.loadProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
