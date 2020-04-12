import React from 'react';
import { useHistory } from 'react-router-dom';

import './Homepage.css';

function Homepage() {
  const history = useHistory();

  const handleSignUpClick = () => {
    history.push('/signup');
  };

  const handleSignInClick = () => {
    history.push('/signin');
  };

  return (
    <div className='homepage'>
      <h1>ToDo Manager</h1>
      <div className='break'></div>
      <button className='signup' onClick={handleSignUpClick}>
        Sign up
      </button>
      <button className='signin' onClick={handleSignInClick}>
        Sign In
      </button>
    </div>
  );
}

export default Homepage;
