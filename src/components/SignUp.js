import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as signupActions from '../redux/actions/signupActions';
import { API_BASE_URL } from '../constants';

function SignUp(props) {
  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const onSave = (event) => {
    event.preventDefault();
    if (props.mode === 'signup') {
      props.userSignUpPost(username, password);
    } else if (props.mode === 'signin') {
      props.userSignInPost(username, password);
    }
    history.push('/projects');
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form
        onSubmit={onSave}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '150px auto',
        }}
      >
        {error !== '' ? (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        ) : (
          ''
        )}
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          className='form-control'
          value={username}
          onChange={onUsernameChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          className='form-control'
          value={password}
          onChange={onPasswordChange}
        />
        <input
          type='submit'
          value={props.mode === 'signup' ? 'Sign Up' : 'Sign In'}
          className='btn btn-primary'
          style={{ margin: '20px 0' }}
        />
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  userPostFetch: (username, password) =>
    dispatch(signupActions.signUp(username, password)),
  userSignInPost: (username, password) =>
    dispatch(signupActions.signIn(username, password)),
});

export default connect(null, mapDispatchToProps)(SignUp);
