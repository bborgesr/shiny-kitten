import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './components/Homepage';
import Footer from './components/common/Footer';

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => <Homepage {...props} text={'Shiny Kitten'} />}
        />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
