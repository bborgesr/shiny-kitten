import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as projectActions from '../../redux/actions/projectActions';

function ManageProject(props) {
  const history = useHistory();
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

  const goBack = () => {
    history.push({
      pathname: '/projects',
      state: {
        username: props.location.state.username,
        projects: props.projects,
      },
    });
  };

  return (
    <div>
      <button type='button' onClick={goBack}>
        Go back
      </button>
      <h1>Manage project</h1>
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
