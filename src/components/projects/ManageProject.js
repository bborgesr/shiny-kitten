import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as projectActions from '../../redux/actions/projectActions';

function ManageProject(props) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{loading ? 'Loading' : <h1>Manage project</h1>}</div>;
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
