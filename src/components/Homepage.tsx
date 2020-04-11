import React from 'react';

import './Homepage.css';

interface AppProps {
  text: string;
}

function Homepage({ text }: AppProps) {
  return (
    <div className='Homepage'>
      <h1>{text}</h1>
    </div>
  );
}

export default Homepage;