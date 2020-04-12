import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as projectActions from '../redux/actions/projectActions';

function Projects(props) {
  // const prevState = props.location.state;

  const user = props.location.state;

  // const [user, setUser] = useState(props.location.state.username);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props
      .loadProjects(user.username)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        alert('Loading projects failed: ' + error);
      });
    // fetch(`http://localhost:4000/person/${user.username}`).then((res) => {
    //   if (res.status === 200) {
    //     res.json().then((jsonData) => {
    //       setProjects(jsonData);
    //       setLoading(false);
    //     });
    //   }
    // });
  }, [props, props.loadProjects, user.username]);

  // const createMainScreen = () => {
  //   let projects = [];
  //   for (let i = 0; i < projects.length; i++) {
  //     const project = projects[i]
  //     projects.push(<Project name={project.name} todos={project.todos} done={} />);
  //   }
  //   return <div>projects</div>;
  // };

  const [project, setProject] = useState({ name: '' });

  const handleChange = (event) => {
    event.preventDefault();
    const projectValue = { ...project, name: event.target.value };
    setProject(projectValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createProject(project);
  };

  return (
    <div>
      {/* {prevState === undefined && <Redirect to='/' />} */}
      {loading ? (
        'Loading'
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Projects</h1>
          <h3>Add Project</h3>
          <input type='text' onChange={handleChange} value={project.name} />
          <input type='submit' value='Save' />
          {props.projects.map((project) => (
            <div key={project.name}>{project.name}</div>
          ))}
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

// function mapDispatchToProps(dispatch) {
//   return {
//     createProject: (project) => dispatch(projectActions.createProject(project)),
//   };
// }

const mapDispatchToProps = {
  createProject: projectActions.createProject,
  loadProjects: projectActions.loadProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

// [
// {
//   "name": "main",
//   "todo": ["task one", "task two"],
//   "done": ["task three"]
// },
// {
//   "name": "main2",
//   "todo": ["task2 one", "task two"],
//   "done": ["task2 three"]
// }
// ]
