import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUp(props) {
  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSave = (event) => {
    event.preventDefault();
    if (props.mode === 'signup') {
      fetch('http://localhost:4000/person', {
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
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (props.mode === 'signin') {
      fetch(`http://localhost:4000/person/${username}`, {
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
    <div>
      <form onSubmit={onSave}>
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
        />
      </form>
    </div>
  );
}

export default SignUp;
