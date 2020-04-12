import React from 'react';
import { Link } from 'react-router-dom';

function ProjectsList({ projects, username }) {
  return (
    <div>
      {projects.map((project, i) => (
        <div key={i}>
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
        </div>
      ))}
    </div>
  );
}

export default ProjectsList;
