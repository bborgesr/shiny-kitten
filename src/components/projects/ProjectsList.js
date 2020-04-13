import React from 'react';
import { Link } from 'react-router-dom';

function ProjectsList({ projects, username }) {
  return (
    <ul>
      {projects.map((project, i) => (
        <li key={i}>
          <h4>
            <Link
              to={{
                pathname: '/project/' + project.name,
                state: {
                  username,
                  project,
                },
              }}
            >
              {project.name}
            </Link>
          </h4>
        </li>
      ))}
    </ul>
  );
}

export default ProjectsList;
