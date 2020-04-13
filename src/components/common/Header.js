import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Header.css';

function Header(props) {
  return (
    <div className='header'>
      <h4>ToDo Manager</h4>
      {['/', '/signin', '/signup'].includes(props.location.pathname) ? (
        ''
      ) : (
        <Link to='/'>Log Out</Link>
      )}
    </div>
  );
}

export default withRouter(Header);
