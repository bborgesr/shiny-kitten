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

  const [project, setProject] = useState({ name: '' });

  const handleChange = (event) => {
    event.preventDefault();
    const projectValue = { ...project, name: event.target.value };
    setProject(projectValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.createProject(project);
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
    // console.log(JSON.stringify([...props.projects, project]));
  };

  return (
    <div>
      {loading ? (
        'Loading'
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Projects</h1>
          <h3>Add Project</h3>
          <input type='text' onChange={handleChange} value={project.name} />
          <input type='submit' value='Save' />
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
