import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Homepage from './components/Homepage';
import About from './components/About';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => <Homepage {...props} text={'Shiny Kitten'} />}
        />
        <Route path='/about' component={About} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
