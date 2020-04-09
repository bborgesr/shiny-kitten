import React from 'react';
import PropTypes from 'prop-types';

import './App.css';

interface AppProps {
  text: string;
}

function App({ text }: AppProps) {
  return (
    <div className='App'>
      <a className='App-link' href='https://reactjs.org'>
        {text}
      </a>
    </div>
  );
}

App.propTypes = {
  text: PropTypes.string.isRequired,
};

export default App;
