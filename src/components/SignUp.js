import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { API_BASE_URL } from '../constants';

function SignUp(props) {
  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const onSave = (event) => {
    event.preventDefault();
    if (props.mode === 'signup') {
      fetch(`${API_BASE_URL}/person`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then(function (res) {
          if (res.status === 200) {
            history.push({
              pathname: '/projects',
              state: { username },
            });
          } else if (res.status === 403) {
            setError('Username already taken');
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (props.mode === 'signin') {
      fetch(`${API_BASE_URL}/person/${username}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then(function (res) {
          if (res.status === 200) {
            history.push({
              pathname: '/projects',
              state: { username },
            });
          } else if (res.status === 403) {
            setError('Wrong username or password');
            setUsername('');
            setPassword('');
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
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

export default SignUp;
